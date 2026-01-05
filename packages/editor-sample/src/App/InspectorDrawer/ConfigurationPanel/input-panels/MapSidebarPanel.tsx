import React, { useCallback,useState } from 'react';

import HeightIcon from '@mui/icons-material/Height';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button, CircularProgress } from '@mui/material';
import { MapProps, MapPropsDefaults, MapPropsSchema } from '@usewaypoint/block-map';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import SliderInput from './helpers/inputs/SliderInput';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

type MapSidebarPanelProps = {
  data: MapProps;
  setData: (v: MapProps) => void;
};

// Fetch lat/long from Google Geocoding API
async function fetchCoordinates(address: string): Promise<{ lat: string; lng: string } | null> {
  if (!address || !GOOGLE_MAPS_API_KEY) return null;
  
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat.toString(),
        lng: location.lng.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export default function MapSidebarPanel({ data, setData }: MapSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (d: unknown) => {
    const res = MapPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const address = data.props?.address ?? MapPropsDefaults.address;
  const latitude = data.props?.latitude ?? MapPropsDefaults.latitude;
  const longitude = data.props?.longitude ?? MapPropsDefaults.longitude;
  const zoom = data.props?.zoom ?? MapPropsDefaults.zoom;
  const width = data.props?.width ?? MapPropsDefaults.width;
  const height = data.props?.height ?? MapPropsDefaults.height;
  const showLink = data.props?.showLink ?? MapPropsDefaults.showLink;
  const linkText = data.props?.linkText ?? MapPropsDefaults.linkText;
  const buttonColor = data.props?.buttonColor ?? MapPropsDefaults.buttonColor;
  const buttonTextColor = data.props?.buttonTextColor ?? MapPropsDefaults.buttonTextColor;

  // Fetch coordinates from address
  const handleFetchCoordinates = useCallback(async () => {
    if (!address) return;
    
    setIsLoading(true);
    const coords = await fetchCoordinates(address);
    setIsLoading(false);
    
    if (coords) {
      updateData({
        ...data,
        props: {
          ...data.props,
          latitude: coords.lat,
          longitude: coords.lng,
        },
      });
    } else {
      alert('Could not find coordinates for this address. Please check the address and try again.');
    }
  }, [address, data]);

  // Handle address change with auto-fetch
  const handleAddressChange = useCallback(async (newAddress: string) => {
    updateData({ ...data, props: { ...data.props, address: newAddress } });
  }, [data]);

  // Google Maps directions URL
  const googleMapsUrl = address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const handleOpenMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <BaseSidebarPanel title="Map block">
      <Button
        variant="contained"
        color="primary"
        startIcon={<OpenInNewIcon />}
        onClick={handleOpenMaps}
        fullWidth
        sx={{ mb: 2 }}
      >
        Open in Google Maps
      </Button>
      <VariableTextInput
        label="Address"
        defaultValue={address}
        onChange={handleAddressChange}
        helperText="Enter address and click 'Get Coordinates' to update map"
      />
      <Button
        variant="outlined"
        color="secondary"
        startIcon={isLoading ? <CircularProgress size={16} /> : <MyLocationIcon />}
        onClick={handleFetchCoordinates}
        fullWidth
        disabled={isLoading || !address}
        sx={{ mb: 2 }}
      >
        {isLoading ? 'Fetching...' : 'Get Coordinates from Address'}
      </Button>
      <VariableTextInput
        label="Latitude"
        defaultValue={latitude}
        onChange={(latitude) => updateData({ ...data, props: { ...data.props, latitude } })}
      />
      <VariableTextInput
        label="Longitude"
        defaultValue={longitude}
        onChange={(longitude) => updateData({ ...data, props: { ...data.props, longitude } })}
      />

      <SliderInput
        label="Zoom Level"
        iconLabel={<ZoomInIcon fontSize="small" />}
        units=""
        defaultValue={zoom}
        min={1}
        max={18}
        step={1}
        onChange={(zoom) => updateData({ ...data, props: { ...data.props, zoom } })}
      />

      <SliderInput
        label="Width (px)"
        iconLabel={<WidthFullIcon fontSize="small" />}
        units="px"
        defaultValue={width}
        min={200}
        max={800}
        step={50}
        onChange={(width) => updateData({ ...data, props: { ...data.props, width } })}
      />

      <SliderInput
        label="Height (px)"
        iconLabel={<HeightIcon fontSize="small" />}
        units="px"
        defaultValue={height}
        min={150}
        max={500}
        step={50}
        onChange={(height) => updateData({ ...data, props: { ...data.props, height } })}
      />

      <BooleanInput
        label="Show Link"
        defaultValue={showLink}
        onChange={(showLink) => updateData({ ...data, props: { ...data.props, showLink } })}
      />

      {showLink && (
        <>
          <VariableTextInput
            label="Button Text"
            defaultValue={linkText}
            onChange={(linkText) => updateData({ ...data, props: { ...data.props, linkText } })}
          />
          <ColorInput
            label="Button Color"
            defaultValue={buttonColor}
            onChange={(buttonColor) => updateData({ ...data, props: { ...data.props, buttonColor } })}
          />
          <ColorInput
            label="Button Text Color"
            defaultValue={buttonTextColor}
            onChange={(buttonTextColor) => updateData({ ...data, props: { ...data.props, buttonTextColor } })}
          />
        </>
      )}

      <MultiStylePropertyPanel
        names={['backgroundColor', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
