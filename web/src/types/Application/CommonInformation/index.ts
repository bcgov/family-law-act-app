export interface otherPartyInfoType {
  name: nameInfoType;
  knowDob: string;
  dob: string;
  opRelation: string;
  livedTogether: string;
  dateOfLivedTogether: string;
  married: string;
  dateOfMarriage: string;
  separated: string;
  dateSeparated: string;
  address: addressInfoType;
  contactInfo: contactInfoType;
}

export interface childInfoType {
  name: nameInfoType;  
  dob: string;
  relation: string;
  opRelation: string;
  currentLiving: string;
  currentLivingComment?: string;
  ack: string;
  additionalInfo: string;
  additionalInfoDetails: string;
}

export interface nameInfoType {
  first: string;
  middle: string;
  last: string;
}

export interface contactInfoType {
  phone: string;
  fax: string;
  email: string;
}

export interface addressInfoType {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}




