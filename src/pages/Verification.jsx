import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Assignment,
  VerifiedUser,
  Description,
  Person,
  Message,
  CheckCircle,
  CloudUpload,
  AttachMoney,
  ScheduleSend,
} from '@mui/icons-material';

const Verification = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verificationType, setVerificationType] = useState('');
  const [documents, setDocuments] = useState([]);
  // Removed unused agent selection state

  // Mock data
  const verificationTypes = [
    {
      id: 'c-of-o',
      name: 'C-of-O Verification',
      description: 'Verify authenticity of Certificate of Occupancy',
      price: 15000,
      duration: '24-48 hours',
      requirements: ['C-of-O copy', 'Property location', 'Owner details'],
    },
    {
      id: 'survey-plan',
      name: 'Survey Plan Verification',
      description: 'Confirm survey plan matches AGIS records',
      price: 12000,
      duration: '24 hours',
      requirements: ['Survey plan copy', 'Coordinates', 'Land dimensions'],
    },
    {
      id: 'agis-search',
      name: 'AGIS Record Search',
      description: 'Comprehensive search in AGIS database',
      price: 8000,
      duration: '12-24 hours',
      requirements: ['Property address', 'Owner name', 'Plot number'],
    },
    {
      id: 'title-verification',
      name: 'Title Document Verification',
      description: 'Verify all title documents authenticity',
      price: 20000,
      duration: '48-72 hours',
      requirements: ['All title documents', 'Previous transactions', 'Survey details'],
    },
    {
      id: 'encumbrance-check',
      name: 'Encumbrance Check',
      description: 'Check for liens, mortgages, or legal issues',
      price: 10000,
      duration: '24 hours',
      requirements: ['Property details', 'Owner information', 'Document copies'],
    },
  ];

  // Mock Deal Initiator data
  const dealInitiator = {
    name: 'Alex DealMaster',
    platformPhone: '+234800-AGIS-PLT',
    whatsAppLink: 'https://wa.me/2348002447758',
    tier: 'GOLD',
    responseTime: '2.1h',
    deals: 24,
    verified: true,
    profileImage: '/api/placeholder/60/60',
  };

  const verificationSteps = [
    {
      label: 'Select Verification Type',
      description: 'Choose the type of verification service you need',
    },
    {
      label: 'Upload Documents',
      description: 'Provide the required documents for verification',
    },
    {
      label: 'Contact Deal Initiator',
      description: 'Contact our certified Deal Initiator for secure verification',
    },
    {
      label: 'Review & Pay',
      description: 'Confirm details and make payment',
    },
    {
      label: 'Verification in Progress',
      description: 'Track your verification status',
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleVerificationTypeSelect = (type) => {
    setVerificationType(type);
    handleNext();
  };

  // Remove agent selection logic

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    setDocuments(prev => [...prev, ...files.map(file => ({
      id: Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadTime: new Date(),
    }))]);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <VerificationTypeStep onSelect={handleVerificationTypeSelect} types={verificationTypes} />;
      case 1:
        return <DocumentUploadStep documents={documents} onUpload={handleDocumentUpload} onNext={handleNext} />;
      case 2:
        return <DealInitiatorContactStep />;
      case 3:
        return <ReviewStep verificationType={verificationTypes.find(t => t.id === verificationType)} dealInitiator={dealInitiator} documents={documents} onConfirm={handleNext} />;
      case 4:
        return <ProgressStep verificationType={verificationTypes.find(t => t.id === verificationType)} dealInitiator={dealInitiator} />;
      default:
        return 'Unknown step';
    }
  };

  const VerificationTypeStep = ({ onSelect, types }) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        What would you like to verify?
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Choose the verification service that matches your needs
      </Typography>
      
      <Grid container spacing={2}>
        {types.map((type) => (
          <Grid item xs={12} md={6} key={type.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: verificationType === type.id ? 2 : 1,
                borderColor: verificationType === type.id ? 'primary.main' : 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  borderColor: 'primary.main'
                }
              }}
              onClick={() => onSelect(type.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {type.name}
                  </Typography>
                  <Chip 
                    label={`₦${type.price.toLocaleString()}`} 
                    color="primary" 
                    variant="filled"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {type.description}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                  ⏱️ {type.duration}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  Requirements:
                </Typography>
                <List dense>
                  {type.requirements.map((req, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List># DigiAGIS Platform: Software Architecture Document

## 1. Executive Summary

### 1.1 Vision Statement
To create a trusted digital marketplace that bridges the gap between property seekers and AGIS-certified agents through a network of Deal Initiators (DIs), ensuring secure, documented property transactions while preventing commission bypass.

### 1.2 Core Problem Statement
The current property market suffers from:
- Difficulty identifying legitimate property owners among multiple agents
- Lack of transparency in property documentation
- Risk of agents bypassing platforms to avoid commission payments
- Inefficient deal initiation and verification processes

### 1.3 Solution Overview
A platform that introduces Deal Initiators as intermediaries who facilitate connections while protecting platform revenue through controlled information flow and secure communication channels.

## 2. System Architecture

### 2.1 High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Buyer/Seller  │    │ Deal Initiator   │    │  AGIS Agent     │
│                 │    │  (Platform DI)   │    │                 │
└─────────┬───────┘    └─────────┬────────┘    └─────────┬───────┘
          │                      │                       │
          └──────────────────────┼───────────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   DigiAGIS Platform         │
                  │   (Orchestration Layer)     │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   AGIS Integration &        │
                  │   Document Verification     │
                  └─────────────────────────────┘
```

### 2.2 Core Components

#### 2.2.1 User Management Module
- **Buyer/Seller Registration**: Normal email registration with property preferences
- **Agent Onboarding**: Official @digiagis emails with AGIS certification verification
- **Deal Initiator Program**: Platform-employed DIs with specialized training
- **Admin/Funder Access**: Platform oversight and agent management

#### 2.2.2 Property Marketplace Module
- **Property Listings**: Agent-uploaded properties with AGIS documentation
- **Verification System**: Document authenticity verification workflow
- **Search & Discovery**: Location-based property matching
- **Trust Scoring**: Agent and property reliability metrics

#### 2.2.3 Deal Initiation Engine
- **Smart Matching**: AI-powered connection between buyers and DIs
- **Information Control**: Controlled disclosure of contact details
- **Commission Protection**: Prevention of direct agent-buyer communication
- **Deal Tracking**: End-to-end transaction monitoring

#### 2.2.4 Communication System
- **Secure Messaging**: Encrypted in-platform communication
- **Controlled Contact**: Progressive information disclosure
- **Deal Rooms**: Secure spaces for transaction discussions
- **Notification System**: Real-time updates for all parties

## 3. Workflow Architecture

### 3.1 Property Discovery & Verification Workflow

```
Phase 1: Property Listing & Verification
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Agent     │ →  │ Document    │ →  │ Platform    │
│  Lists      │    │ Upload &    │    │ Verification│
│ Property    │    │ AGIS Check  │    │ & Approval  │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 2: Buyer Discovery & DI Assignment
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Buyer     │ →  │ Property    │ →  │ Deal        │
│  Searches   │    │ Match & DI  │    │ Initiator   │
│  Property   │    │ Assignment  │    │ Assigned    │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 3: Controlled Introduction & Deal Making
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DI        │ →  │ Agent       │ →  │ Secure Deal │
│ Contacts    │    │ Contact &   │    │ Room with   │
│ Agent       │    │ Discussion  │    │ All Parties │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 3.2 Commission Protection Workflow

#### 3.2.1 Information Control Protocol
1. **Initial Contact**: Buyer contacts DI through platform
2. **Property Matching**: DI identifies suitable agents/properties
3. **Agent Outreach**: DI contacts agent without revealing buyer details
4. **Deal Room Creation**: Platform creates secure communication channel
5. **Progressive Disclosure**: Buyer details revealed only after commitment

#### 3.2.2 Commission Assurance Mechanisms
- **Platform-Mediated Payments**: All financial transactions through platform
- **Escrow Services**: Funds held until deal completion
- **Performance Tracking**: DI and agent performance monitoring
- **Contract Enforcement**: Legal agreements preventing commission avoidance

## 4. Data Architecture

### 4.1 Information Segmentation

#### 4.1.1 Public Information (Visible to All)
- Property details (location, size, price range)
- Agent trust scores and verification status
- Property verification status
- DI availability and ratings

#### 4.1.2 Restricted Information (Platform & DI Only)
- Buyer contact information
- Buyer budget and preferences
- Communication history
- Deal negotiation details

#### 4.1.3 Progressive Disclosure Timeline
```
Day 1-3: DI works with buyer to understand needs
Day 4-7: DI contacts agents without revealing buyer identity
Day 8+: Secure deal room with all parties, full disclosure
```

### 4.2 Security Architecture

#### 4.2.1 Data Protection Layers
- **Encryption**: End-to-end encryption for all communications
- **Access Control**: Role-based access to sensitive information
- **Audit Logging**: Complete transaction history tracking
- **Compliance**: GDPR, local data protection regulations

## 5. Business Logic Architecture

### 5.1 Commission Model

#### 5.1.1 Revenue Streams
1. **Platform Commission**: 2-5% of transaction value
2. **Verification Fees**: Fixed fee for document verification
3. **Subscription Fees**: Agent premium account subscriptions
4. **DI Commission Sharing**: Platform-DI revenue sharing

#### 5.1.2 Commission Distribution
```
Total Commission: 5%
- Platform: 2%
- Deal Initiator: 3%
- Agent: Receives full agreed price from buyer
```

### 5.2 Trust and Verification System

#### 5.2.1 Multi-Layer Verification
1. **Agent Verification**: AGIS certification and background checks
2. **Document Verification**: AGIS record cross-referencing
3. **Property Verification**: Physical verification where possible
4. **Transaction Verification**: Legal document authentication

## 6. Technology Stack Architecture

### 6.1 Frontend Architecture
- **Framework**: React.js with Material-UI
- **State Management**: Redux/Context API
- **Real-time Communication**: WebSocket for live updates
- **Mobile Responsive**: Progressive Web App capabilities

### 6.2 Backend Architecture
- **API Framework**: Node.js with Express.js
- **Database**: PostgreSQL for relational data, Redis for caching
- **File Storage**: AWS S3 for document storage
- **Search Engine**: Elasticsearch for property search

### 6.3 Integration Architecture
- **AGIS API Integration**: Secure government system connectivity
- **Payment Gateway**: Flutterwave/Paystack integration
- **SMS/Email Services**: Twilio, SendGrid for notifications
- **Mapping Services**: Google Maps/Mapbox integration

## 7. Operational Architecture

### 7.1 Deal Initiator Program

#### 7.1.1 DI Recruitment & Training
- **Background Checks**: Comprehensive screening process
- **AGIS Training**: Understanding of property documentation
- **Platform Training**: System usage and ethical guidelines
- **Performance Monitoring**: Continuous quality assessment

#### 7.1.2 DI Workflow Management
- **Case Assignment**: Automated DI-property matching
- **Performance Metrics**: Success rate, response time, customer satisfaction
- **Commission Structure**: Performance-based incentive model
- Quality Assurance: Regular audit and feedback

### 7.2 Agent Management

#### 7.2.1 Onboarding Process
- **AGIS Verification**: Certification authenticity check
- **Document Upload**: Required property documentation
- **Platform Training**: System usage and commission structure
- **Contract Signing**: Legal agreement preventing bypass

#### 7.2.2 Performance Monitoring
- **Response Time**: Time to respond to DI inquiries
- **Deal Success Rate**: Percentage of initiated deals closed
- **Customer Satisfaction**: Buyer/DI feedback scores
- **Compliance**: Adherence to platform policies

## 8. Risk Mitigation Architecture

### 8.1 Commission Protection Measures

#### 8.1.1 Technical Controls
- **Communication Monitoring**: AI-powered pattern detection for bypass attempts
- **Contact Obfuscation**: Temporary phone numbers and email forwarding
- **Watermarking**: Unique identifiers in all shared documents
- **Blockchain Ledger**: Immutable transaction records

#### 8.1.2 Legal & Contractual Controls
- **Agent Agreements**: Legal contracts with anti-bypass clauses
- **DI Contracts**: Confidentiality and non-compete agreements
- **Buyer Terms**: Platform usage and commission acknowledgment
- **Penalty System**: Fines and platform banning for violations
# DigiAGIS Platform: Software Architecture Document

## 1. Executive Summary

### 1.1 Vision Statement
To create a trusted digital marketplace that bridges the gap between property seekers and AGIS-certified agents through a network of Deal Initiators (DIs), ensuring secure, documented property transactions while preventing commission bypass.

### 1.2 Core Problem Statement
The current property market suffers from:
- Difficulty identifying legitimate property owners among multiple agents
- Lack of transparency in property documentation
- Risk of agents bypassing platforms to avoid commission payments
- Inefficient deal initiation and verification processes

### 1.3 Solution Overview
A platform that introduces Deal Initiators as intermediaries who facilitate connections while protecting platform revenue through controlled information flow and secure communication channels.

## 2. System Architecture

### 2.1 High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Buyer/Seller  │    │ Deal Initiator   │    │  AGIS Agent     │
│                 │    │  (Platform DI)   │    │                 │
└─────────┬───────┘    └─────────┬────────┘    └─────────┬───────┘
          │                      │                       │
          └──────────────────────┼───────────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   DigiAGIS Platform         │
                  │   (Orchestration Layer)     │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   AGIS Integration &        │
                  │   Document Verification     │
                  └─────────────────────────────┘
```

### 2.2 Core Components

#### 2.2.1 User Management Module
- **Buyer/Seller Registration**: Normal email registration with property preferences
- **Agent Onboarding**: Official @digiagis emails with AGIS certification verification
- **Deal Initiator Program**: Platform-employed DIs with specialized training
- **Admin/Funder Access**: Platform oversight and agent management

#### 2.2.2 Property Marketplace Module
- **Property Listings**: Agent-uploaded properties with AGIS documentation
- **Verification System**: Document authenticity verification workflow
- **Search & Discovery**: Location-based property matching
- **Trust Scoring**: Agent and property reliability metrics

#### 2.2.3 Deal Initiation Engine
- **Smart Matching**: AI-powered connection between buyers and DIs
- **Information Control**: Controlled disclosure of contact details
- **Commission Protection**: Prevention of direct agent-buyer communication
- **Deal Tracking**: End-to-end transaction monitoring

#### 2.2.4 Communication System
- **Secure Messaging**: Encrypted in-platform communication
- **Controlled Contact**: Progressive information disclosure
- **Deal Rooms**: Secure spaces for transaction discussions
- **Notification System**: Real-time updates for all parties

## 3. Workflow Architecture

### 3.1 Property Discovery & Verification Workflow

```
Phase 1: Property Listing & Verification
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Agent     │ →  │ Document    │ →  │ Platform    │
│  Lists      │    │ Upload &    │    │ Verification│
│ Property    │    │ AGIS Check  │    │ & Approval  │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 2: Buyer Discovery & DI Assignment
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Buyer     │ →  │ Property    │ →  │ Deal        │
│  Searches   │    │ Match & DI  │    │ Initiator   │
│  Property   │    │ Assignment  │    │ Assigned    │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 3: Controlled Introduction & Deal Making
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DI        │ →  │ Agent       │ →  │ Secure Deal │
│ Contacts    │    │ Contact &   │    │ Room with   │
│ Agent       │    │ Discussion  │    │ All Parties │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 3.2 Commission Protection Workflow

#### 3.2.1 Information Control Protocol
1. **Initial Contact**: Buyer contacts DI through platform
2. **Property Matching**: DI identifies suitable agents/properties
3. **Agent Outreach**: DI contacts agent without revealing buyer details
4. **Deal Room Creation**: Platform creates secure communication channel
5. **Progressive Disclosure**: Buyer details revealed only after commitment

#### 3.2.2 Commission Assurance Mechanisms
- **Platform-Mediated Payments**: All financial transactions through platform
- **Escrow Services**: Funds held until deal completion
- **Performance Tracking**: DI and agent performance monitoring
- **Contract Enforcement**: Legal agreements preventing commission avoidance

## 4. Data Architecture

### 4.1 Information Segmentation

#### 4.1.1 Public Information (Visible to All)
- Property details (location, size, price range)
- Agent trust scores and verification status
- Property verification status
- DI availability and ratings

#### 4.1.2 Restricted Information (Platform & DI Only)
- Buyer contact information
- Buyer budget and preferences
- Communication history
- Deal negotiation details

#### 4.1.3 Progressive Disclosure Timeline
```
Day 1-3: DI works with buyer to understand needs
Day 4-7: DI contacts agents without revealing buyer identity
Day 8+: Secure deal room with all parties, full disclosure
```

### 4.2 Security Architecture

#### 4.2.1 Data Protection Layers
- **Encryption**: End-to-end encryption for all communications
- **Access Control**: Role-based access to sensitive information
- **Audit Logging**: Complete transaction history tracking
- **Compliance**: GDPR, local data protection regulations

## 5. Business Logic Architecture

### 5.1 Commission Model

#### 5.1.1 Revenue Streams
1. **Platform Commission**: 2-5% of transaction value
2. **Verification Fees**: Fixed fee for document verification
3. **Subscription Fees**: Agent premium account subscriptions
4. **DI Commission Sharing**: Platform-DI revenue sharing

#### 5.1.2 Commission Distribution
```
Total Commission: 5%
- Platform: 2%
- Deal Initiator: 3%
- Agent: Receives full agreed price from buyer
```

### 5.2 Trust and Verification System

#### 5.2.1 Multi-Layer Verification
1. **Agent Verification**: AGIS certification and background checks
2. **Document Verification**: AGIS record cross-referencing
3. **Property Verification**: Physical verification where possible
4. **Transaction Verification**: Legal document authentication

## 6. Technology Stack Architecture

### 6.1 Frontend Architecture
- **Framework**: React.js with Material-UI
- **State Management**: Redux/Context API
- **Real-time Communication**: WebSocket for live updates
- **Mobile Responsive**: Progressive Web App capabilities

### 6.2 Backend Architecture
- **API Framework**: Node.js with Express.js
- **Database**: PostgreSQL for relational data, Redis for caching
- **File Storage**: AWS S3 for document storage
- **Search Engine**: Elasticsearch for property search

### 6.3 Integration Architecture
- **AGIS API Integration**: Secure government system connectivity
- **Payment Gateway**: Flutterwave/Paystack integration
- **SMS/Email Services**: Twilio, SendGrid for notifications
- **Mapping Services**: Google Maps/Mapbox integration

## 7. Operational Architecture

### 7.1 Deal Initiator Program

#### 7.1.1 DI Recruitment & Training
- **Background Checks**: Comprehensive screening process
- **AGIS Training**: Understanding of property documentation
- **Platform Training**: System usage and ethical guidelines
- **Performance Monitoring**: Continuous quality assessment

#### 7.1.2 DI Workflow Management
- **Case Assignment**: Automated DI-property matching
- **Performance Metrics**: Success rate, response time, customer satisfaction
- **Commission Structure**: Performance-based incentive model
- Quality Assurance: Regular audit and feedback

### 7.2 Agent Management

#### 7.2.1 Onboarding Process
- **AGIS Verification**: Certification authenticity check
- **Document Upload**: Required property documentation
- **Platform Training**: System usage and commission structure
- **Contract Signing**: Legal agreement preventing bypass

#### 7.2.2 Performance Monitoring
- **Response Time**: Time to respond to DI inquiries
- **Deal Success Rate**: Percentage of initiated deals closed
- **Customer Satisfaction**: Buyer/DI feedback scores
- **Compliance**: Adherence to platform policies

## 8. Risk Mitigation Architecture

### 8.1 Commission Protection Measures

#### 8.1.1 Technical Controls
- **Communication Monitoring**: AI-powered pattern detection for bypass attempts
- **Contact Obfuscation**: Temporary phone numbers and email forwarding
- **Watermarking**: Unique identifiers in all shared documents
- **Blockchain Ledger**: Immutable transaction records

#### 8.1.2 Legal & Contractual Controls
- **Agent Agreements**: Legal contracts with anti-bypass clauses
- **DI Contracts**: Confidentiality and non-compete agreements
- **Buyer Terms**: Platform usage and commission acknowledgment
- **Penalty System**: Fines and platform banning for violations

### 8.2 Fraud Prevention

#### 8.2.1 Identity Verification
- **KYC Processes**: Know Your Customer verification
- **Document Authentication**: AI-powered document verification
- **Behavioral Analysis**: Unusual pattern detection
- **Escrow Services**: Secure fund handling

## 9. Scalability Architecture

### 9.1 Growth Projections
- **Phase 1**: Abuja-focused operations (6 months)
- **Phase 2**: Expansion to other Nigerian states (12 months)
- **Phase 3**: Regional expansion (24 months)
- **Phase 4**: Additional service verticals (36 months)

### 9.2 Technical Scalability
- **Microservices Architecture**: Independent service scaling
- **Load Balancing**: Distributed traffic management
- **Database Sharding**: Horizontal data partitioning
- **CDN Integration**: Global content delivery

## 10. Success Metrics & KPIs

### 10.1 Platform Performance
- **Transaction Volume**: Number of successful deals monthly
- **Commission Revenue**: Total platform earnings
- **User Growth**: New buyers, sellers, agents, DIs
- **Retention Rates**: User and agent platform loyalty
# DigiAGIS Platform: Software Architecture Document

## 1. Executive Summary

### 1.1 Vision Statement
To create a trusted digital marketplace that bridges the gap between property seekers and AGIS-certified agents through a network of Deal Initiators (DIs), ensuring secure, documented property transactions while preventing commission bypass.

### 1.2 Core Problem Statement
The current property market suffers from:
- Difficulty identifying legitimate property owners among multiple agents
- Lack of transparency in property documentation
- Risk of agents bypassing platforms to avoid commission payments
- Inefficient deal initiation and verification processes

### 1.3 Solution Overview
A platform that introduces Deal Initiators as intermediaries who facilitate connections while protecting platform revenue through controlled information flow and secure communication channels.

## 2. System Architecture

### 2.1 High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Buyer/Seller  │    │ Deal Initiator   │    │  AGIS Agent     │
│                 │    │  (Platform DI)   │    │                 │
└─────────┬───────┘    └─────────┬────────┘    └─────────┬───────┘
          │                      │                       │
          └──────────────────────┼───────────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   DigiAGIS Platform         │
                  │   (Orchestration Layer)     │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │   AGIS Integration &        │
                  │   Document Verification     │
                  └─────────────────────────────┘
```

### 2.2 Core Components

#### 2.2.1 User Management Module
- **Buyer/Seller Registration**: Normal email registration with property preferences
- **Agent Onboarding**: Official @digiagis emails with AGIS certification verification
- **Deal Initiator Program**: Platform-employed DIs with specialized training
- **Admin/Funder Access**: Platform oversight and agent management

#### 2.2.2 Property Marketplace Module
- **Property Listings**: Agent-uploaded properties with AGIS documentation
- **Verification System**: Document authenticity verification workflow
- **Search & Discovery**: Location-based property matching
- **Trust Scoring**: Agent and property reliability metrics

#### 2.2.3 Deal Initiation Engine
- **Smart Matching**: AI-powered connection between buyers and DIs
- **Information Control**: Controlled disclosure of contact details
- **Commission Protection**: Prevention of direct agent-buyer communication
- **Deal Tracking**: End-to-end transaction monitoring

#### 2.2.4 Communication System
- **Secure Messaging**: Encrypted in-platform communication
- **Controlled Contact**: Progressive information disclosure
- **Deal Rooms**: Secure spaces for transaction discussions
- **Notification System**: Real-time updates for all parties

## 3. Workflow Architecture

### 3.1 Property Discovery & Verification Workflow

```
Phase 1: Property Listing & Verification
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Agent     │ →  │ Document    │ →  │ Platform    │
│  Lists      │    │ Upload &    │    │ Verification│
│ Property    │    │ AGIS Check  │    │ & Approval  │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 2: Buyer Discovery & DI Assignment
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Buyer     │ →  │ Property    │ →  │ Deal        │
│  Searches   │    │ Match & DI  │    │ Initiator   │
│  Property   │    │ Assignment  │    │ Assigned    │
└─────────────┘    └─────────────┘    └─────────────┘

Phase 3: Controlled Introduction & Deal Making
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DI        │ →  │ Agent       │ →  │ Secure Deal │
│ Contacts    │    │ Contact &   │    │ Room with   │
│ Agent       │    │ Discussion  │    │ All Parties │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 3.2 Commission Protection Workflow

#### 3.2.1 Information Control Protocol
1. **Initial Contact**: Buyer contacts DI through platform
2. **Property Matching**: DI identifies suitable agents/properties
3. **Agent Outreach**: DI contacts agent without revealing buyer details
4. **Deal Room Creation**: Platform creates secure communication channel
5. **Progressive Disclosure**: Buyer details revealed only after commitment

#### 3.2.2 Commission Assurance Mechanisms
- **Platform-Mediated Payments**: All financial transactions through platform
- **Escrow Services**: Funds held until deal completion
- **Performance Tracking**: DI and agent performance monitoring
- **Contract Enforcement**: Legal agreements preventing commission avoidance

## 4. Data Architecture

### 4.1 Information Segmentation

#### 4.1.1 Public Information (Visible to All)
- Property details (location, size, price range)
- Agent trust scores and verification status
- Property verification status
- DI availability and ratings

#### 4.1.2 Restricted Information (Platform & DI Only)
- Buyer contact information
- Buyer budget and preferences
- Communication history
- Deal negotiation details

#### 4.1.3 Progressive Disclosure Timeline
```
Day 1-3: DI works with buyer to understand needs
Day 4-7: DI contacts agents without revealing buyer identity
Day 8+: Secure deal room with all parties, full disclosure
```

### 4.2 Security Architecture

#### 4.2.1 Data Protection Layers
- **Encryption**: End-to-end encryption for all communications
- **Access Control**: Role-based access to sensitive information
- **Audit Logging**: Complete transaction history tracking
- **Compliance**: GDPR, local data protection regulations

## 5. Business Logic Architecture

### 5.1 Commission Model

#### 5.1.1 Revenue Streams
1. **Platform Commission**: 2-5% of transaction value
2. **Verification Fees**: Fixed fee for document verification
3. **Subscription Fees**: Agent premium account subscriptions
4. **DI Commission Sharing**: Platform-DI revenue sharing

#### 5.1.2 Commission Distribution
```
Total Commission: 5%
- Platform: 2%
- Deal Initiator: 3%
- Agent: Receives full agreed price from buyer
```

### 5.2 Trust and Verification System

#### 5.2.1 Multi-Layer Verification
1. **Agent Verification**: AGIS certification and background checks
2. **Document Verification**: AGIS record cross-referencing
3. **Property Verification**: Physical verification where possible
4. **Transaction Verification**: Legal document authentication

## 6. Technology Stack Architecture

### 6.1 Frontend Architecture
- **Framework**: React.js with Material-UI
- **State Management**: Redux/Context API
- **Real-time Communication**: WebSocket for live updates
- **Mobile Responsive**: Progressive Web App capabilities

### 6.2 Backend Architecture
- **API Framework**: Node.js with Express.js
- **Database**: PostgreSQL for relational data, Redis for caching
- **File Storage**: AWS S3 for document storage
- **Search Engine**: Elasticsearch for property search

### 6.3 Integration Architecture
- **AGIS API Integration**: Secure government system connectivity
- **Payment Gateway**: Flutterwave/Paystack integration
- **SMS/Email Services**: Twilio, SendGrid for notifications
- **Mapping Services**: Google Maps/Mapbox integration

## 7. Operational Architecture

### 7.1 Deal Initiator Program

#### 7.1.1 DI Recruitment & Training
- **Background Checks**: Comprehensive screening process
- **AGIS Training**: Understanding of property documentation
- **Platform Training**: System usage and ethical guidelines
- **Performance Monitoring**: Continuous quality assessment

#### 7.1.2 DI Workflow Management
- **Case Assignment**: Automated DI-property matching
- **Performance Metrics**: Success rate, response time, customer satisfaction
- **Commission Structure**: Performance-based incentive model
- Quality Assurance: Regular audit and feedback

### 7.2 Agent Management

#### 7.2.1 Onboarding Process
- **AGIS Verification**: Certification authenticity check
- **Document Upload**: Required property documentation
- **Platform Training**: System usage and commission structure
- **Contract Signing**: Legal agreement preventing bypass

#### 7.2.2 Performance Monitoring
- **Response Time**: Time to respond to DI inquiries
- **Deal Success Rate**: Percentage of initiated deals closed
- **Customer Satisfaction**: Buyer/DI feedback scores
- **Compliance**: Adherence to platform policies

## 8. Risk Mitigation Architecture

### 8.1 Commission Protection Measures

#### 8.1.1 Technical Controls
- **Communication Monitoring**: AI-powered pattern detection for bypass attempts
- **Contact Obfuscation**: Temporary phone numbers and email forwarding
- **Watermarking**: Unique identifiers in all shared documents
- **Blockchain Ledger**: Immutable transaction records

#### 8.1.2 Legal & Contractual Controls
- **Agent Agreements**: Legal contracts with anti-bypass clauses
- **DI Contracts**: Confidentiality and non-compete agreements
- **Buyer Terms**: Platform usage and commission acknowledgment
- **Penalty System**: Fines and platform banning for violations

### 8.2 Fraud Prevention

#### 8.2.1 Identity Verification
- **KYC Processes**: Know Your Customer verification
- **Document Authentication**: AI-powered document verification
- **Behavioral Analysis**: Unusual pattern detection
- **Escrow Services**: Secure fund handling

## 9. Scalability Architecture

### 9.1 Growth Projections
- **Phase 1**: Abuja-focused operations (6 months)
- **Phase 2**: Expansion to other Nigerian states (12 months)
- **Phase 3**: Regional expansion (24 months)
- **Phase 4**: Additional service verticals (36 months)

### 9.2 Technical Scalability
- **Microservices Architecture**: Independent service scaling
- **Load Balancing**: Distributed traffic management
- **Database Sharding**: Horizontal data partitioning
- **CDN Integration**: Global content delivery

## 10. Success Metrics & KPIs

### 10.1 Platform Performance
- **Transaction Volume**: Number of successful deals monthly
- **Commission Revenue**: Total platform earnings
- **User Growth**: New buyers, sellers, agents, DIs
- **Retention Rates**: User and agent platform loyalty

### 10.2 Quality Metrics
- **Deal Success Rate**: Percentage of initiated deals that close
- **Average Deal Time**: Time from initiation to completion
- **Customer Satisfaction**: NPS and user feedback scores
- **Dispute Resolution**: Success rate in resolving issues

## 11. Conclusion

This architecture creates a sustainable ecosystem where:
- **Buyers/Sellers** get access to verified properties and professional assistance
- **Agents** gain qualified leads and streamlined verification processes
- **Deal Initiators** earn commissions through platform-facilitated introductions
- **Platform** generates revenue while maintaining control over the transaction ecosystem

The key innovation is the Deal Initiator role combined with controlled information flow, ensuring platform value is maintained while providing superior service to all participants.
### 10.2 Quality Metrics
- **Deal Success Rate**: Percentage of initiated deals that close
- **Average Deal Time**: Time from initiation to completion
- **Customer Satisfaction**: NPS and user feedback scores
- **Dispute Resolution**: Success rate in resolving issues

## 11. Conclusion

This architecture creates a sustainable ecosystem where:
- **Buyers/Sellers** get access to verified properties and professional assistance
- **Agents** gain qualified leads and streamlined verification processes
- **Deal Initiators** earn commissions through platform-facilitated introductions
- **Platform** generates revenue while maintaining control over the transaction ecosystem

The key innovation is the Deal Initiator role combined with controlled information flow, ensuring platform value is maintained while providing superior service to all participants.
### 8.2 Fraud Prevention

#### 8.2.1 Identity Verification
- **KYC Processes**: Know Your Customer verification
- **Document Authentication**: AI-powered document verification
- **Behavioral Analysis**: Unusual pattern detection
- **Escrow Services**: Secure fund handling

## 9. Scalability Architecture

### 9.1 Growth Projections
- **Phase 1**: Abuja-focused operations (6 months)
- **Phase 2**: Expansion to other Nigerian states (12 months)
- **Phase 3**: Regional expansion (24 months)
- **Phase 4**: Additional service verticals (36 months)

### 9.2 Technical Scalability
- **Microservices Architecture**: Independent service scaling
- **Load Balancing**: Distributed traffic management
- **Database Sharding**: Horizontal data partitioning
- **CDN Integration**: Global content delivery

## 10. Success Metrics & KPIs

### 10.1 Platform Performance
- **Transaction Volume**: Number of successful deals monthly
- **Commission Revenue**: Total platform earnings
- **User Growth**: New buyers, sellers, agents, DIs
- **Retention Rates**: User and agent platform loyalty

### 10.2 Quality Metrics
- **Deal Success Rate**: Percentage of initiated deals that close
- **Average Deal Time**: Time from initiation to completion
- **Customer Satisfaction**: NPS and user feedback scores
- **Dispute Resolution**: Success rate in resolving issues

## 11. Conclusion

This architecture creates a sustainable ecosystem where:
- **Buyers/Sellers** get access to verified properties and professional assistance
- **Agents** gain qualified leads and streamlined verification processes
- **Deal Initiators** earn commissions through platform-facilitated introductions
- **Platform** generates revenue while maintaining control over the transaction ecosystem

The key innovation is the Deal Initiator role combined with controlled information flow, ensuring platform value is maintained while providing superior service to all participants.
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const DocumentUploadStep = ({ documents, onUpload, onNext }) => {
    const selectedType = verificationTypes.find(t => t.id === verificationType);
    
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Upload Required Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          Please upload clear copies of the following documents
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Upload Area */}
            <Paper
              sx={{
                p: 4,
                border: '2px dashed',
                borderColor: 'divider',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
              onClick={() => document.getElementById('document-upload').click()}
            >
              <input
                id="document-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={onUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Click to upload documents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supported formats: PDF, JPG, PNG, DOC (Max 10MB each)
              </Typography>
            </Paper>

            {/* Uploaded Documents */}
            {documents.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Documents ({documents.length})
                </Typography>
                <List>
                  {documents.map((doc, index) => (
                    <ListItem
                      key={doc.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <Description color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={doc.name}
                        secondary={`${(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded ${doc.uploadTime.toLocaleTimeString()}`}
                      />
                      <Chip label="Uploaded" color="success" size="small" />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Assignment sx={{ mr: 1 }} />
                Required Documents
              </Typography>
              
              {selectedType && (
                <List dense>
                  {selectedType.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              )}
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Ensure documents are clear and all details are visible. Blurry documents may delay verification.
              </Alert>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={onNext}
            disabled={documents.length === 0}
          >
            Continue to Agent Selection
          </Button>
        </Box>
      </Box>
    );
  };

  // Instead of agent selection, show Deal Initiator contact info
  const DealInitiatorContactStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Contact the Deal Initiator
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        For secure property verification, please contact our certified Deal Initiator below. Agent details are hidden for platform security.
      </Typography>
      <Card sx={{ p: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Avatar src={dealInitiator.profileImage} sx={{ width: 60, height: 60, mr: 4 }} />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {dealInitiator.name}
          </Typography>
          <Chip label={`Tier: ${dealInitiator.tier}`} color="warning" sx={{ mr: 2 }} />
          <Chip label="Verified" color="success" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Platform Phone: <strong>{dealInitiator.platformPhone}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            WhatsApp: <a href={dealInitiator.whatsAppLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">Contact on WhatsApp</a>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Response Time: {dealInitiator.responseTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Deals: {dealInitiator.deals}
          </Typography>
        </Box>
      </Card>
      <Alert severity="info" sx={{ mt: 3 }}>
        For security, all communications and payments are managed by the platform. Agent details are only visible to Deal Initiators and platform admins.
      </Alert>
    </Box>
  );

  // Review step now only shows Deal Initiator details
  const ReviewStep = ({ verificationType, dealInitiator, documents, onConfirm }) => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Verification Request
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Please confirm all details before proceeding with payment
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            {/* Service Details */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Service Details
            </Typography>
            {verificationType && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Service Type:</strong> {verificationType.name}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    <strong>₦{verificationType.price.toLocaleString()}</strong>
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {verificationType.description}
                </Typography>
              </Box>
            )}

            {/* Deal Initiator Details */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Person sx={{ mr: 1 }} />
              Deal Initiator
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar src={dealInitiator.profileImage} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {dealInitiator.name}
                </Typography>
                <Chip label={`Tier: ${dealInitiator.tier}`} color="warning" sx={{ mr: 2 }} />
                <Chip label="Verified" color="success" />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Platform Phone: <strong>{dealInitiator.platformPhone}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  WhatsApp: <a href={dealInitiator.whatsAppLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">Contact on WhatsApp</a>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Response Time: {dealInitiator.responseTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Deals: {dealInitiator.deals}
                </Typography>
              </Box>
            </Box>

            {/* Documents */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Description sx={{ mr: 1 }} />
              Documents ({documents.length})
            </Typography>
            <List dense>
              {documents.map((doc, index) => (
                <ListItem key={doc.id}>
                  <ListItemIcon>
                    <Description color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={doc.name} />
                  <Chip label="Ready" color="success" size="small" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Service Fee</Typography>
                <Typography>₦{verificationType?.price.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Platform Fee</Typography>
                <Typography>₦2,000</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>VAT (7.5%)</Typography>
                <Typography>₦{(verificationType?.price * 0.075).toLocaleString()}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  ₦{verificationType ? Math.round(verificationType.price * 1.075 + 2000).toLocaleString() : '0'}
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" fullWidth size="large" onClick={onConfirm}>
              <AttachMoney sx={{ mr: 1 }} />
              Proceed to Payment
            </Button>
            <Alert severity="info" sx={{ mt: 2 }}>
              You'll be redirected to a secure payment gateway. Your verification will start immediately after payment confirmation.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  // Progress step now only references Deal Initiator
  const ProgressStep = ({ verificationType, dealInitiator }) => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h4" gutterBottom color="success.main">
        Verification Request Submitted!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Your {verificationType?.name} request has been received. Our Deal Initiator <strong>{dealInitiator.name}</strong> will coordinate your verification securely.
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
        <Typography variant="h6" gutterBottom>
          What happens next?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ScheduleSend color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Deal Initiator Notification"
              secondary={`Our Deal Initiator (${dealInitiator.name}) has been notified and will start working on your request within 1 hour.`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Description color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Document Review"
              secondary="Your uploaded documents will be reviewed and you may be contacted for additional information if needed."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VerifiedUser color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="AGIS Verification"
              secondary="The Deal Initiator will coordinate AGIS checks and verification."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Assignment color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Report Generation"
              secondary="You'll receive a comprehensive verification report with findings and recommendations."
            />
          </ListItem>
        </List>
        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={25} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Initial processing - Estimated completion: {verificationType?.duration}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" startIcon={<Message />}>
          Message Deal Initiator
        </Button>
        <Button variant="contained" startIcon={<Assignment />}>
          View Dashboard
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Property Verification
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get your property documents verified by certified AGIS agents
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Stepper */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {verificationSteps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === verificationSteps.length - 1 ? (
                        <Typography variant="caption">Final step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2">{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            {activeStep > 0 && activeStep < verificationSteps.length - 1 && (
              <Button onClick={handleBack} sx={{ mt: 2 }}>
                Back
              </Button>
            )}
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {getStepContent(activeStep)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verification;