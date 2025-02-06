export default interface Address {
  title: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: number;
  isDefault?: boolean;
  isLastUsed?: boolean;
}
