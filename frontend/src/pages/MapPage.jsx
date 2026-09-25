import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ShieldAlert, Compass, Activity } from 'lucide-react';

// Controller to smoothly fly to a city when clicked
function FlyToLocation({ target }) {
  const map = useMap();
  if (target) {
    map.flyTo([target.lat, target.lng], 8, { duration: 1.2 });
  }
  return null;
}

// 67 dense real coordinates across all zones of India
const denseMapPoints = [
  // Telangana & Andhra Pradesh
  { id: 1, name: 'School Building - Warangal South', lat: 17.9689, lng: 79.5941, city: 'Warangal', state: 'Telangana', risk: 89.5, type: 'Critical', budget: '₹2.19 Cr', exp: '₹2.15 Cr', phys: '10%', fin: '98%', vendor: 'VEND271', fraud: 'Ghost Project' },
  { id: 2, name: 'Drinking Water RO Plant - Hyderabad Old City', lat: 17.3850, lng: 78.4867, city: 'Hyderabad', state: 'Telangana', risk: 62.4, type: 'High', budget: '₹1.80 Cr', exp: '₹1.50 Cr', phys: '45%', fin: '83%', vendor: 'VEND142', fraud: 'Cost Overrun' },
  { id: 3, name: 'Anganwadi Complex - Khammam Urban', lat: 17.2473, lng: 80.1514, city: 'Khammam', state: 'Telangana', risk: 38.0, type: 'Medium', budget: '₹0.75 Cr', exp: '₹0.40 Cr', phys: '55%', fin: '53%', vendor: 'VEND056', fraud: 'Normal' },
  { id: 4, name: 'Coastal Drainage Network - Visakhapatnam', lat: 17.6868, lng: 83.2185, city: 'Visakhapatnam', state: 'Andhra Pradesh', risk: 78.1, type: 'Critical', budget: '₹3.40 Cr', exp: '₹3.20 Cr', phys: '20%', fin: '94%', vendor: 'VEND098', fraud: 'Lump-Sum Siphoning' },
  { id: 5, name: 'Solar Street Illumination - Vijayawada', lat: 16.5062, lng: 80.6480, city: 'Vijayawada', state: 'Andhra Pradesh', risk: 22.4, type: 'Low', budget: '₹1.10 Cr', exp: '₹0.95 Cr', phys: '88%', fin: '86%', vendor: 'VEND012', fraud: 'Normal' },
  { id: 6, name: 'High School Lab - Tirupati Rural', lat: 13.6288, lng: 79.4192, city: 'Tirupati', state: 'Andhra Pradesh', risk: 19.8, type: 'Low', budget: '₹0.90 Cr', exp: '₹0.85 Cr', phys: '95%', fin: '94%', vendor: 'VEND019', fraud: 'Normal' },

  // Bihar & Jharkhand
  { id: 7, name: 'Water Supply Scheme - Patna West', lat: 25.5941, lng: 85.1376, city: 'Patna', state: 'Bihar', risk: 84.2, type: 'Critical', budget: '₹4.50 Cr', exp: '₹4.40 Cr', phys: '15%', fin: '95%', vendor: 'VEND104', fraud: 'Lump-Sum Siphoning' },
  { id: 8, name: 'Rural Connectivity Bridge - Muzaffarpur', lat: 26.1209, lng: 85.3647, city: 'Muzaffarpur', state: 'Bihar', risk: 81.3, type: 'Critical', budget: '₹3.80 Cr', exp: '₹3.70 Cr', phys: '12%', fin: '97%', vendor: 'VEND188', fraud: 'Ghost Project' },
  { id: 9, name: 'Community Center - Gaya North', lat: 24.7914, lng: 85.0002, city: 'Gaya', state: 'Bihar', risk: 59.2, type: 'High', budget: '₹1.60 Cr', exp: '₹1.30 Cr', phys: '40%', fin: '81%', vendor: 'VEND065', fraud: 'Cost Overrun' },
  { id: 10, name: 'Primary Health Center - Bhagalpur', lat: 25.2425, lng: 86.9842, city: 'Bhagalpur', state: 'Bihar', risk: 42.1, type: 'Medium', budget: '₹1.20 Cr', exp: '₹0.80 Cr', phys: '60%', fin: '66%', vendor: 'VEND044', fraud: 'Normal' },
  { id: 11, name: 'Vocational Training Shed - Ranchi East', lat: 23.3441, lng: 85.3096, city: 'Ranchi', state: 'Jharkhand', risk: 77.9, type: 'Critical', budget: '₹2.70 Cr', exp: '₹2.60 Cr', phys: '18%', fin: '96%', vendor: 'VEND133', fraud: 'Lump-Sum Siphoning' },
  { id: 12, name: 'Tribal Welfare Complex - Jamshedpur', lat: 22.8046, lng: 86.2029, city: 'Jamshedpur', state: 'Jharkhand', risk: 24.5, type: 'Low', budget: '₹1.50 Cr', exp: '₹1.40 Cr', phys: '90%', fin: '93%', vendor: 'VEND031', fraud: 'Normal' },
  { id: 13, name: 'Solar Micro-Grid - Dhanbad Coalfield', lat: 23.7957, lng: 86.4304, city: 'Dhanbad', state: 'Jharkhand', risk: 65.4, type: 'High', budget: '₹2.20 Cr', exp: '₹1.90 Cr', phys: '35%', fin: '86%', vendor: 'VEND078', fraud: 'Cost Overrun' },

  // Maharashtra & Goa
  { id: 14, name: 'Public Toilet Complex - Thane North', lat: 19.2183, lng: 72.9781, city: 'Thane', state: 'Maharashtra', risk: 76.8, type: 'Critical', budget: '₹0.95 Cr', exp: '₹0.90 Cr', phys: '25%', fin: '92%', vendor: 'VEND088', fraud: 'Lump-Sum Siphoning' },
  { id: 15, name: 'Slum Sanitation Pipeline - Mumbai Suburban', lat: 19.0760, lng: 72.8777, city: 'Mumbai', state: 'Maharashtra', risk: 58.6, type: 'High', budget: '₹4.10 Cr', exp: '₹3.30 Cr', phys: '45%', fin: '80%', vendor: 'VEND092', fraud: 'Cost Overrun' },
  { id: 16, name: 'Youth Sports Complex - Pune Rural', lat: 18.5204, lng: 73.8567, city: 'Pune', state: 'Maharashtra', risk: 28.1, type: 'Low', budget: '₹2.50 Cr', exp: '₹2.30 Cr', phys: '85%', fin: '92%', vendor: 'VEND022', fraud: 'Normal' },
  { id: 17, name: 'Paved Agro Road - Nashik Vineyards', lat: 19.9975, lng: 73.7898, city: 'Nashik', state: 'Maharashtra', risk: 44.5, type: 'Medium', budget: '₹1.90 Cr', exp: '₹1.20 Cr', phys: '62%', fin: '63%', vendor: 'VEND051', fraud: 'Normal' },
  { id: 18, name: 'Check Dam Renovation - Nagpur West', lat: 21.1458, lng: 79.0882, city: 'Nagpur', state: 'Maharashtra', risk: 83.1, type: 'Critical', budget: '₹3.10 Cr', exp: '₹3.05 Cr', phys: '08%', fin: '98%', vendor: 'VEND219', fraud: 'Ghost Project' },
  { id: 19, name: 'Cold Storage Room - Aurangabad', lat: 19.8762, lng: 75.3433, city: 'Aurangabad', state: 'Maharashtra', risk: 48.0, type: 'Medium', budget: '₹1.40 Cr', exp: '₹1.00 Cr', phys: '58%', fin: '71%', vendor: 'VEND061', fraud: 'Normal' },
  { id: 20, name: 'Fisheries Shed - Panaji Jetty', lat: 15.4909, lng: 73.8278, city: 'Panaji', state: 'Goa', risk: 16.5, type: 'Low', budget: '₹0.85 Cr', exp: '₹0.70 Cr', phys: '92%', fin: '82%', vendor: 'VEND005', fraud: 'Normal' },

  // Karnataka & Kerala
  { id: 21, name: 'Community Hall - Bengaluru East', lat: 12.9716, lng: 77.5946, city: 'Bengaluru', state: 'Karnataka', risk: 62.4, type: 'High', budget: '₹3.10 Cr', exp: '₹2.80 Cr', phys: '55%', fin: '82%', vendor: 'VEND045', fraud: 'Cost Overrun' },
  { id: 22, name: 'Solar Street Lights - Mysuru Heritage', lat: 12.2958, lng: 76.6394, city: 'Mysuru', state: 'Karnataka', risk: 18.2, type: 'Low', budget: '₹0.80 Cr', exp: '₹0.45 Cr', phys: '85%', fin: '80%', vendor: 'VEND014', fraud: 'Normal' },
  { id: 23, name: 'Submersible Borewell Network - Hubli', lat: 15.3647, lng: 75.1240, city: 'Hubli', state: 'Karnataka', risk: 75.2, type: 'Critical', budget: '₹2.30 Cr', exp: '₹2.20 Cr', phys: '15%', fin: '95%', vendor: 'VEND164', fraud: 'Lump-Sum Siphoning' },
  { id: 24, name: 'Anganwadi Nutrition Center - Mangaluru', lat: 12.9141, lng: 74.8560, city: 'Mangaluru', state: 'Karnataka', risk: 21.0, type: 'Low', budget: '₹0.95 Cr', exp: '₹0.85 Cr', phys: '90%', fin: '89%', vendor: 'VEND028', fraud: 'Normal' },
  { id: 25, name: 'Panchayat Mini-Auditorium - Belagavi', lat: 15.8497, lng: 74.4977, city: 'Belagavi', state: 'Karnataka', risk: 46.8, type: 'Medium', budget: '₹1.50 Cr', exp: '₹1.10 Cr', phys: '60%', fin: '73%', vendor: 'VEND049', fraud: 'Normal' },
  { id: 26, name: 'Canal Bund Protection - Kochi Backwaters', lat: 9.9312, lng: 76.2673, city: 'Kochi', state: 'Kerala', risk: 57.8, type: 'High', budget: '₹2.80 Cr', exp: '₹2.40 Cr', phys: '38%', fin: '85%', vendor: 'VEND071', fraud: 'Cost Overrun' },
  { id: 27, name: 'Digital Library Center - Thiruvananthapuram', lat: 8.5241, lng: 76.9366, city: 'Thiruvananthapuram', state: 'Kerala', risk: 14.1, type: 'Low', budget: '₹1.30 Cr', exp: '₹1.25 Cr', phys: '96%', fin: '96%', vendor: 'VEND002', fraud: 'Normal' },
  { id: 28, name: 'Primary School Roof Replacement - Kozhikode', lat: 11.2588, lng: 75.7804, city: 'Kozhikode', state: 'Kerala', risk: 29.5, type: 'Low', budget: '₹0.70 Cr', exp: '₹0.60 Cr', phys: '85%', fin: '85%', vendor: 'VEND016', fraud: 'Normal' },

  // Tamil Nadu
  { id: 29, name: 'Public Library Building - Madurai Central', lat: 9.9252, lng: 78.1198, city: 'Madurai', state: 'Tamil Nadu', risk: 14.5, type: 'Low', budget: '₹1.20 Cr', exp: '₹0.70 Cr', phys: '90%', fin: '88%', vendor: 'VEND008', fraud: 'Normal' },
  { id: 30, name: 'Storm Water Drain - Chennai North', lat: 13.0827, lng: 80.2707, city: 'Chennai', state: 'Tamil Nadu', risk: 80.4, type: 'Critical', budget: '₹4.90 Cr', exp: '₹4.80 Cr', phys: '14%', fin: '98%', vendor: 'VEND240', fraud: 'Ghost Project' },
  { id: 31, name: 'Weavers Common Facility - Coimbatore', lat: 11.0168, lng: 76.9558, city: 'Coimbatore', state: 'Tamil Nadu', risk: 36.2, type: 'Medium', budget: '₹2.00 Cr', exp: '₹1.30 Cr', phys: '68%', fin: '65%', vendor: 'VEND039', fraud: 'Normal' },
  { id: 32, name: 'Bus Stand Waiting Hall - Tiruchirappalli', lat: 10.7905, lng: 78.7047, city: 'Tiruchirappalli', state: 'Tamil Nadu', risk: 23.0, type: 'Low', budget: '₹0.85 Cr', exp: '₹0.80 Cr', phys: '92%', fin: '94%', vendor: 'VEND021', fraud: 'Normal' },
  { id: 33, name: 'Desalination Mini Plant - Ramanathapuram', lat: 9.3639, lng: 78.8395, city: 'Ramanathapuram', state: 'Tamil Nadu', risk: 72.8, type: 'High', budget: '₹2.60 Cr', exp: '₹2.30 Cr', phys: '30%', fin: '88%', vendor: 'VEND083', fraud: 'Cost Overrun' },

  // North India (Delhi, UP, Punjab, Haryana, J&K)
  { id: 34, name: 'CCTV Surveillance Grid - New Delhi Central', lat: 28.6139, lng: 77.2090, city: 'New Delhi', state: 'Delhi', risk: 32.5, type: 'Low', budget: '₹3.50 Cr', exp: '₹3.00 Cr', phys: '85%', fin: '85%', vendor: 'VEND035', fraud: 'Normal' },
  { id: 35, name: 'Primary Health Centre - Lucknow Cantt', lat: 26.8467, lng: 80.9462, city: 'Lucknow', state: 'Uttar Pradesh', risk: 38.5, type: 'Medium', budget: '₹2.10 Cr', exp: '₹1.20 Cr', phys: '65%', fin: '62%', vendor: 'VEND090', fraud: 'Normal' },
  { id: 36, name: 'Road Resurfacing - Barabanki Rural', lat: 26.9272, lng: 81.1834, city: 'Barabanki', state: 'Uttar Pradesh', risk: 86.9, type: 'Critical', budget: '₹1.75 Cr', exp: '₹1.70 Cr', phys: '05%', fin: '97%', vendor: 'VEND202', fraud: 'Ghost Project' },
  { id: 37, name: 'Sewerage Treatment Link - Kanpur Industrial', lat: 26.4499, lng: 80.3319, city: 'Kanpur', state: 'Uttar Pradesh', risk: 79.3, type: 'Critical', budget: '₹4.20 Cr', exp: '₹4.00 Cr', phys: '16%', fin: '95%', vendor: 'VEND177', fraud: 'Lump-Sum Siphoning' },
  { id: 38, name: 'Ghat Lighting System - Varanasi', lat: 25.3176, lng: 82.9739, city: 'Varanasi', state: 'Uttar Pradesh', risk: 25.0, type: 'Low', budget: '₹1.80 Cr', exp: '₹1.60 Cr', phys: '90%', fin: '88%', vendor: 'VEND018', fraud: 'Normal' },
  { id: 39, name: 'Cold Chain Vaccine Storage - Gorakhpur', lat: 26.7606, lng: 83.3732, city: 'Gorakhpur', state: 'Uttar Pradesh', risk: 63.8, type: 'High', budget: '₹2.10 Cr', exp: '₹1.80 Cr', phys: '35%', fin: '85%', vendor: 'VEND069', fraud: 'Cost Overrun' },
  { id: 40, name: 'Paved Village Link - Amritsar Border', lat: 31.6340, lng: 74.8723, city: 'Amritsar', state: 'Punjab', risk: 74.1, type: 'High', budget: '₹2.40 Cr', exp: '₹2.20 Cr', phys: '28%', fin: '91%', vendor: 'VEND110', fraud: 'Lump-Sum Siphoning' },
  { id: 41, name: 'Solar Agro Pumps - Ludhiana District', lat: 30.9010, lng: 75.8573, city: 'Ludhiana', state: 'Punjab', risk: 18.9, type: 'Low', budget: '₹1.90 Cr', exp: '₹1.70 Cr', phys: '90%', fin: '89%', vendor: 'VEND025', fraud: 'Normal' },
  { id: 42, name: 'Gymnasium & Youth Park - Jalandhar', lat: 31.3260, lng: 75.5762, city: 'Jalandhar', state: 'Punjab', risk: 39.2, type: 'Medium', budget: '₹1.10 Cr', exp: '₹0.70 Cr', phys: '62%', fin: '63%', vendor: 'VEND047', fraud: 'Normal' },
  { id: 43, name: 'Rainwater Harvesting Pit - Gurugram South', lat: 28.4595, lng: 77.0266, city: 'Gurugram', state: 'Haryana', risk: 81.0, type: 'Critical', budget: '₹1.60 Cr', exp: '₹1.55 Cr', phys: '12%', fin: '96%', vendor: 'VEND159', fraud: 'Ghost Project' },
  { id: 44, name: 'Women Skill Training Center - Panipat', lat: 29.3909, lng: 76.9635, city: 'Panipat', state: 'Haryana', risk: 22.0, type: 'Low', budget: '₹0.80 Cr', exp: '₹0.75 Cr', phys: '93%', fin: '93%', vendor: 'VEND011', fraud: 'Normal' },
  { id: 45, name: 'Snow Shelter & Health Post - Srinagar', lat: 34.0837, lng: 74.7973, city: 'Srinagar', state: 'Jammu & Kashmir', risk: 67.2, type: 'High', budget: '₹2.90 Cr', exp: '₹2.60 Cr', phys: '32%', fin: '89%', vendor: 'VEND086', fraud: 'Cost Overrun' },
  { id: 46, name: 'Bridge Approach Ramp - Jammu Tawi', lat: 32.7266, lng: 74.8570, city: 'Jammu', state: 'Jammu & Kashmir', risk: 35.0, type: 'Medium', budget: '₹1.80 Cr', exp: '₹1.20 Cr', phys: '65%', fin: '66%', vendor: 'VEND053', fraud: 'Normal' },

  // West Bengal & North-East
  { id: 47, name: 'Anganwadi Centre - Kolkata South', lat: 22.5726, lng: 88.3639, city: 'Kolkata', state: 'West Bengal', risk: 42.0, type: 'Medium', budget: '₹1.50 Cr', exp: '₹0.90 Cr', phys: '60%', fin: '60%', vendor: 'VEND112', fraud: 'Normal' },
  { id: 48, name: 'Flood Embankment Repair - Sundarbans', lat: 22.1352, lng: 88.7594, city: 'Canning', state: 'West Bengal', risk: 87.4, type: 'Critical', budget: '₹4.30 Cr', exp: '₹4.20 Cr', phys: '08%', fin: '97%', vendor: 'VEND231', fraud: 'Ghost Project' },
  { id: 49, name: 'Tea Garden Worker Creche - Siliguri', lat: 26.7271, lng: 88.3953, city: 'Siliguri', state: 'West Bengal', risk: 26.5, type: 'Low', budget: '₹0.95 Cr', exp: '₹0.85 Cr', phys: '88%', fin: '89%', vendor: 'VEND020', fraud: 'Normal' },
  { id: 50, name: 'Market Yard Concrete Platform - Asansol', lat: 23.6739, lng: 86.9524, city: 'Asansol', state: 'West Bengal', risk: 54.0, type: 'Medium', budget: '₹1.70 Cr', exp: '₹1.40 Cr', phys: '50%', fin: '82%', vendor: 'VEND062', fraud: 'Cost Overrun' },
  { id: 51, name: 'River Erosion Protection Slabs - Guwahati', lat: 26.1445, lng: 91.7362, city: 'Guwahati', state: 'Assam', risk: 79.0, type: 'Critical', budget: '₹3.60 Cr', exp: '₹3.50 Cr', phys: '15%', fin: '97%', vendor: 'VEND184', fraud: 'Lump-Sum Siphoning' },
  { id: 52, name: 'Weaving Cooperative Shade - Dibrugarh', lat: 27.4728, lng: 94.9120, city: 'Dibrugarh', state: 'Assam', risk: 21.5, type: 'Low', budget: '₹1.05 Cr', exp: '₹0.95 Cr', phys: '91%', fin: '90%', vendor: 'VEND017', fraud: 'Normal' },
  { id: 53, name: 'District Hospital ICU Annex - Agartala', lat: 23.8315, lng: 91.2868, city: 'Agartala', state: 'Tripura', risk: 41.0, type: 'Medium', budget: '₹2.40 Cr', exp: '₹1.60 Cr', phys: '65%', fin: '66%', vendor: 'VEND048', fraud: 'Normal' },
  { id: 54, name: 'Community Rain Shed - Shillong Peak', lat: 25.5788, lng: 91.8933, city: 'Shillong', state: 'Meghalaya', risk: 17.0, type: 'Low', budget: '₹0.60 Cr', exp: '₹0.55 Cr', phys: '95%', fin: '91%', vendor: 'VEND009', fraud: 'Normal' },

  // Rajasthan & Gujarat
  { id: 55, name: 'Road Construction - Jaipur Rural', lat: 26.9124, lng: 75.7873, city: 'Jaipur', state: 'Rajasthan', risk: 58.1, type: 'High', budget: '₹2.80 Cr', exp: '₹2.40 Cr', phys: '50%', fin: '78%', vendor: 'VEND033', fraud: 'Cost Overrun' },
  { id: 56, name: 'Desert Water Tanka Scheme - Jodhpur Outer', lat: 26.2389, lng: 73.0243, city: 'Jodhpur', state: 'Rajasthan', risk: 85.0, type: 'Critical', budget: '₹3.20 Cr', exp: '₹3.10 Cr', phys: '10%', fin: '96%', vendor: 'VEND215', fraud: 'Ghost Project' },
  { id: 57, name: 'Cattle Pond Re-deepening - Bikaner', lat: 28.0229, lng: 73.3119, city: 'Bikaner', state: 'Rajasthan', risk: 73.4, type: 'High', budget: '₹1.50 Cr', exp: '₹1.35 Cr', phys: '30%', fin: '90%', vendor: 'VEND095', fraud: 'Lump-Sum Siphoning' },
  { id: 58, name: 'Girls Hostel Science Block - Udaipur', lat: 24.5854, lng: 73.7125, city: 'Udaipur', state: 'Rajasthan', risk: 20.4, type: 'Low', budget: '₹1.70 Cr', exp: '₹1.60 Cr', phys: '92%', fin: '94%', vendor: 'VEND015', fraud: 'Normal' },
  { id: 59, name: 'Underground Sewer Drainage - Ahmedabad East', lat: 23.0225, lng: 72.5714, city: 'Ahmedabad', state: 'Gujarat', risk: 66.5, type: 'High', budget: '₹4.40 Cr', exp: '₹3.80 Cr', phys: '40%', fin: '86%', vendor: 'VEND074', fraud: 'Cost Overrun' },
  { id: 60, name: 'Skill Dev Centre - Surat Textile Hub', lat: 21.1702, lng: 72.8311, city: 'Surat', state: 'Gujarat', risk: 27.8, type: 'Low', budget: '₹2.10 Cr', exp: '₹1.90 Cr', phys: '88%', fin: '90%', vendor: 'VEND026', fraud: 'Normal' },
  { id: 61, name: 'Check Dam Salt Ingress Barrier - Bhavnagar Coast', lat: 21.7645, lng: 72.1519, city: 'Bhavnagar', state: 'Gujarat', risk: 78.4, type: 'Critical', budget: '₹3.70 Cr', exp: '₹3.55 Cr', phys: '16%', fin: '95%', vendor: 'VEND191', fraud: 'Lump-Sum Siphoning' },

  // Madhya Pradesh, Chhattisgarh & Odisha
  { id: 62, name: 'Tribal Community Center - Bhopal Rural', lat: 23.2599, lng: 77.4126, city: 'Bhopal', state: 'Madhya Pradesh', risk: 37.0, type: 'Medium', budget: '₹1.40 Cr', exp: '₹0.90 Cr', phys: '62%', fin: '64%', vendor: 'VEND054', fraud: 'Normal' },
  { id: 63, name: 'District Library Building - Indore Central', lat: 22.7196, lng: 75.8577, city: 'Indore', state: 'Madhya Pradesh', risk: 15.8, type: 'Low', budget: '₹2.20 Cr', exp: '₹2.00 Cr', phys: '95%', fin: '90%', vendor: 'VEND004', fraud: 'Normal' },
  { id: 64, name: 'Paved Forest Access Road - Jabalpur', lat: 23.1815, lng: 79.9864, city: 'Jabalpur', state: 'Madhya Pradesh', risk: 82.6, type: 'Critical', budget: '₹2.90 Cr', exp: '₹2.80 Cr', phys: '09%', fin: '96%', vendor: 'VEND208', fraud: 'Ghost Project' },
  { id: 65, name: 'Mineral Belt Water Tanker Points - Raipur', lat: 21.2514, lng: 81.6296, city: 'Raipur', state: 'Chhattisgarh', risk: 64.2, type: 'High', budget: '₹1.90 Cr', exp: '₹1.60 Cr', phys: '35%', fin: '84%', vendor: 'VEND081', fraud: 'Cost Overrun' },
  { id: 66, name: 'Cyclone Shelter Reconstruction - Puri Coast', lat: 19.8135, lng: 85.8312, city: 'Puri', state: 'Odisha', risk: 29.0, type: 'Low', budget: '₹2.80 Cr', exp: '₹2.50 Cr', phys: '87%', fin: '89%', vendor: 'VEND023', fraud: 'Normal' },
  { id: 67, name: 'Tribal Residential School Lab - Koraput', lat: 18.8135, lng: 82.7123, city: 'Koraput', state: 'Odisha', risk: 80.2, type: 'Critical', budget: '₹2.50 Cr', exp: '₹2.40 Cr', phys: '14%', fin: '96%', vendor: 'VEND173', fraud: 'Lump-Sum Siphoning' }
];

export default function MapPage() {
  const [selectedPoint, setSelectedPoint] = useState(denseMapPoints[0]);
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [mapLayerType, setMapLayerType] = useState('satellite'); // 'satellite', 'standard', 'dark'

  const filteredPoints = denseMapPoints.filter(p => {
    if (filterRisk === 'ALL') return true;
    return p.type === filterRisk;
  });

  const getMarkerColor = (risk) => {
    if (risk >= 75) return '#ef4444'; // Red
    if (risk >= 55) return '#f97316'; // Orange
    if (risk >= 35) return '#eab308'; // Yellow
    return '#10b981'; // Green
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Compass className="text-indigo-600" size={20} />
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">National GIS Anomaly Telemetry Map</h2>
            <p className="text-[11px] text-slate-500">67 Works Fixed to Coordinates • Pan & Zoom Verified</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Layer Selector */}
          <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-semibold">
            <button
              onClick={() => setMapLayerType('satellite')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                mapLayerType === 'satellite' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛰️ Satellite
            </button>
            <button
              onClick={() => setMapLayerType('standard')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                mapLayerType === 'standard' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🗺️ Standard
            </button>
            <button
              onClick={() => setMapLayerType('dark')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                mapLayerType === 'dark' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌙 Dark GIS
            </button>
          </div>

          {/* Risk Filter Buttons */}
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 text-[11px] font-semibold">
            {['ALL', 'Critical', 'High', 'Medium', 'Low'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRisk(r)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  filterRisk === r ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === 'ALL' ? `All (${denseMapPoints.length})` : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Real Leaflet Map with True Satellite / Standard / Dark options */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl relative h-[530px]">
          
          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <FlyToLocation target={selectedPoint} />

            {/* True High-Resolution Satellite vs Standard OSM vs Dark CartoDB */}
            {mapLayerType === 'satellite' && (
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}

            {mapLayerType === 'standard' && (
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

            {mapLayerType === 'dark' && (
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
            )}

            {/* All 67 Anchored Markers fixed to real earth coordinates */}
            {filteredPoints.map((pt) => {
              const color = getMarkerColor(pt.risk);
              const isSelected = selectedPoint.id === pt.id;

              return (
                <CircleMarker
                  key={pt.id}
                  center={[pt.lat, pt.lng]}
                  radius={isSelected ? 11 : pt.risk >= 75 ? 8 : 6}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.9,
                    color: isSelected ? '#ffffff' : '#000000',
                    weight: isSelected ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => setSelectedPoint(pt),
                  }}
                >
                  <Popup className="text-xs">
                    <div className="p-1 space-y-1">
                      <strong className="block text-slate-900 text-xs font-bold">{pt.name}</strong>
                      <p className="text-[11px] text-slate-500">📍 {pt.city}, {pt.state}</p>
                      <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-200">
                        <span>Risk Score:</span>
                        <strong style={{ color }}>{pt.risk}% ({pt.fraud})</strong>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Floating Top Telemetry Badge */}
          <div className="absolute top-4 left-4 z-[500] pointer-events-none">
            <div className="bg-slate-950/85 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
              <Activity size={13} className="text-emerald-400 animate-pulse" />
              <span>{filteredPoints.length} Monitored Coordinates Positioned</span>
            </div>
          </div>

          {/* Bottom Legend */}
          <div className="absolute bottom-3 left-4 right-4 z-[500] pointer-events-none flex justify-between items-center bg-slate-950/85 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-xl text-[11px] text-slate-300">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical (≥75)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> High (55-74)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Medium (35-54)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low (&lt;35)</span>
            </div>
            <span className="font-mono text-emerald-400">Fixed Ground Position Verified</span>
          </div>
        </div>

        {/* Right Column: Radar Quick-Selection List & Detailed Audit Inspector */}
        <div className="space-y-4">
          {/* Radar Targets Selector (Scrollable) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-red-500" />
                Active Radar Targets ({filteredPoints.length})
              </h3>
              <span className="text-[10px] text-slate-400">Click to fly to point</span>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {filteredPoints.map((pt) => {
                const color = getMarkerColor(pt.risk);
                const isSelected = selectedPoint.id === pt.id;

                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className={`w-full text-left p-2 rounded-lg text-xs flex justify-between items-center transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate font-medium">{pt.city} — {pt.name}</span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded text-white ml-2 shrink-0 font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {pt.risk}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Work Inspection Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">{selectedPoint.name}</h4>
                <p className="text-[10px] text-slate-500">📍 {selectedPoint.city}, {selectedPoint.state}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-[11px]">Fraud Classification:</span>
                <span
                  className="font-bold text-white text-[10px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: getMarkerColor(selectedPoint.risk) }}
                >
                  {selectedPoint.fraud} ({selectedPoint.risk}%)
                </span>
              </div>

              {/* Physical vs Financial meter */}
              <div className="space-y-1.5 pt-1 border-t border-slate-200/60 text-[11px]">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-slate-500">Physical Progress (Ground Site)</span>
                    <span className="font-bold text-slate-800">{selectedPoint.phys}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: selectedPoint.phys }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-slate-500">Financial Disbursement (Claimed)</span>
                    <span className="font-bold text-red-600">{selectedPoint.fin}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: selectedPoint.fin }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-lg">
              <div><span className="text-slate-400 block text-[9px] uppercase">Sanctioned</span><strong className="text-slate-800">{selectedPoint.budget}</strong></div>
              <div><span className="text-slate-400 block text-[9px] uppercase">Disbursed</span><strong className="text-slate-800">{selectedPoint.exp}</strong></div>
              <div><span className="text-slate-400 block text-[9px] uppercase">Vendor</span><strong className="text-slate-800 font-mono">{selectedPoint.vendor}</strong></div>
              <div><span className="text-slate-400 block text-[9px] uppercase">GPS Lat/Lng</span><strong className="text-slate-700 font-mono text-[10px]">{selectedPoint.lat}°, {selectedPoint.lng}°</strong></div>
            </div>

            <button
              onClick={() => alert(`Official Physical Vigilance Inspection Warrant generated for ${selectedPoint.name}`)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ShieldAlert size={14} className="text-red-400" />
              <span>Issue Physical Audit Warrant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}