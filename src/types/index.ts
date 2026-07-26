export interface User {
  id: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  role: 'customer' | 'employee' | 'admin' | 'super-admin';
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  city?: string;
  state?: string;
}

export interface LoanApplication {
  id: string;
  leadId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  loanType: 'home' | 'personal' | 'business' | 'mortgage' | 'car' | 'gold' | 'education';
  loanAmount: number;
  loanTenure: number;
  interestRate: number;
  monthlyEMI: number;
  status: 'submitted' | 'documents-verified' | 'under-review' | 'approved' | 'rejected' | 'disbursed' | 'on-hold';
  documents: Document[];
  assignedEmployee?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  status: 'pending' | 'verified' | 'rejected';
}

export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRateMin: number;
  interestRateMax: number;
  processingFee: number;
  minTenure: number;
  maxTenure: number;
  processingTime: string;
  image: string;
  banner: string;
  features: string[];
  benefits: string[];
  eligibility: Eligibility;
  requiredDocuments: string[];
  faq: FAQ[];
}

export interface Eligibility {
  minAge: number;
  maxAge: number;
  minIncome: number;
  employmentType: string[];
  minCreditScore: number;
  residentialStatus: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface HeroSlider {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Settings {
  id: string;
  companyName: string;
  companyLogo: string;
  companyEmail: string;
  companyPhone: string;
  companyWhatsApp: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companPinCode: string;
  googleMapUrl: string;
  officeHours: string;
  socialLinks: Record<string, string>;
  theme: 'light' | 'dark';
  currency: string;
}
