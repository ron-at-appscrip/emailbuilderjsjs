# @usewaypoint/block-map

Map block component for email templates.

## Usage

```tsx
import { Map, MapPropsSchema } from '@usewaypoint/block-map';

<Map
  style={{ textAlign: 'center', padding: { top: 16, bottom: 16, left: 24, right: 24 } }}
  props={{
    address: 'New York, NY, USA',
    latitude: '40.7128',
    longitude: '-74.0060',
    zoom: 14,
    width: 600,
    height: 300,
    showLink: true,
    linkText: 'Get Directions',
  }}
/>
```

