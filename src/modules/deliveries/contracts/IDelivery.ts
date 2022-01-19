export interface IDelivery {
  id?: string;
  client_id: string;
  deliveryman_id?: string | null;
  product_name: string;
  delivered_at?: string | Date | null;
  created_at: Date;
}
