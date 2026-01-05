# @usewaypoint/block-contact

Contact block component for email templates with email and phone support.

## Usage

```tsx
import { Contact, ContactPropsSchema } from '@usewaypoint/block-contact';

<Contact
  style={{ textAlign: 'left', padding: { top: 16, bottom: 16, left: 24, right: 24 } }}
  props={{
    type: 'both',
    email: 'contact@example.com',
    phone: '+1 234 567 8900',
    showIcon: true,
    layout: 'vertical',
  }}
/>
```

