export interface shipmentData {
  provider: string;
  CurrentStatus: CurrentStatus;
  PromisedDate: string;
  TrackingNumber: string;
  TrackingURL: string;
  SupportPhoneNumbers: string[];
  TransitEvents: TransitEvent[];
  CreateDate: string;
  isEditableShipment: boolean;
  nextWorkingDay: NextWorkingDay[];
}

interface CurrentStatus {
  state: string;
  timestamp: string;
}

interface TransitEvent {
  state: string;
  timestamp: string;
  hub?: string;
  reason?: string;
}

interface NextWorkingDay {
  dayDate: string;
  dayName: string;
}
