export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchCode: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  product: string;
  bookingTime: Date;
  status: string;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
}
