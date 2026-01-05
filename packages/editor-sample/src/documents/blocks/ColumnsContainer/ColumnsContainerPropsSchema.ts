import { z } from 'zod';

import { ColumnsContainerPropsSchema as BaseColumnsContainerPropsSchema } from '@usewaypoint/block-columns-container';

const BasePropsShape = BaseColumnsContainerPropsSchema.shape.props.unwrap().unwrap().shape;

const ColumnsContainerPropsSchema = z.object({
  style: BaseColumnsContainerPropsSchema.shape.style as any,
  props: z
    .object({
      ...BasePropsShape,
      columns: z.tuple([
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
        z.object({ childrenIds: z.array(z.string()) }),
      ]),
    } as any)
    .optional()
    .nullable(),
});

export type ColumnsContainerProps = z.infer<typeof ColumnsContainerPropsSchema>;
export default ColumnsContainerPropsSchema;
