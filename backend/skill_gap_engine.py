from typing import List, Dict, Any

# Curated practical learning roadmaps with Kannada, Hindi, and English resources
ROADMAP_DATABASE = {
    'computer operator': {
        'title': 'Office Computer & Billing Specialist Roadmap',
        'title_kannada': 'ಕಂಪ್ಯೂಟರ್ ಆಪರೇಟರ್ ಮತ್ತು ಬಿಲ್ಲಿಂಗ್ ತರಬೇತಿ ಹಾದಿ',
        'title_hindi': 'ऑफिस कंप्यूटर एवं बिलिंग विशेषज्ञ रोडमैप',
        'target_roles': ['Computer Operator', 'Data Entry Executive', 'Village Grama One Assistant', 'Store Billing Clerk'],
        'income_potential': {
            'current_avg': 8000,
            'after_completion_avg': 16000,
            'increase_percent': 100
        },
        'steps': [
            {
                'step_number': 1,
                'skill': 'Basic Computer & Typing Speed',
                'skill_kannada': 'ಕಂಪ್ಯೂಟರ್ ಮೂಲಭೂತ ಮತ್ತು ಬೆರಳಚ್ಚು ತರಬೇತಿ',
                'skill_hindi': 'बेसिक कंप्यूटर एवं टाइपिंग गति',
                'estimated_hours': 6,
                'description': 'Learn fast Kannada (Nudi/KPR), Hindi, and English keyboard typing, shortcut keys, folder organization.',
                'free_resource': 'Free Typing Practice & Basic OS Guide (Kannada + Hindi + English)',
                'resource_type': 'Hands-on practice',
                'milestone': 'Able to type 30 words per minute and manage files.'
            },
            {
                'step_number': 2,
                'skill': 'Spreadsheets (Excel & Google Sheets)',
                'skill_kannada': 'ಸ್ಪ್ರೆಡ್‌ಶೀಟ್ (ಎಕ್ಸೆಲ್) ಮೂಲಭೂತ ಸೂತ್ರಗಳು',
                'skill_hindi': 'स्प्रेडशीट (एक्सेल एवं गूगल शीट्स)',
                'estimated_hours': 10,
                'description': 'Master SUM, AVERAGE, sorting, filtering, stock entry tables and billing ledger formats.',
                'free_resource': 'Practical Excel for Rural Businesses (Video Series)',
                'resource_type': 'Interactive video tutorial',
                'milestone': 'Build a functional daily shop expense and inventory sheet.'
            },
            {
                'step_number': 3,
                'skill': 'Data Entry & Document Processing',
                'skill_kannada': 'ಡೇಟಾ ಎಂಟ್ರಿ ಮತ್ತು ದಸ್ತಾವೇಜು ನಿರ್ವಹಣೆ',
                'skill_hindi': 'डेटा एंट्री एवं दस्तावेज प्रसंस्करण',
                'estimated_hours': 8,
                'description': 'PDF conversion, online form submissions (citizen services, ration card, voter ID, GST bill creation).',
                'free_resource': 'Rural Citizen Services & Online Portal Tutorial',
                'resource_type': 'Practical step-by-step handbook',
                'milestone': 'Process 20 sample citizen portal applications error-free.'
            }
        ]
    },
    'electrical repair': {
        'title': 'Certified Electrician & Maintenance Technician Roadmap',
        'title_kannada': 'ವಿದ್ಯುತ್ ಉಪಕರಣ ದುರಸ್ತಿ ಮತ್ತು ವೈರಿಂಗ್ ತರಬೇತಿ',
        'title_hindi': 'प्रमाणित इलेक्ट्रीशियन एवं रखरखाव तकनीशियन रोडमैप',
        'target_roles': ['Workshop Electrician', 'Solar Maintenance Assistant', 'Appliance Service Executive', 'Field Technician'],
        'income_potential': {
            'current_avg': 9000,
            'after_completion_avg': 20000,
            'increase_percent': 122
        },
        'steps': [
            {
                'step_number': 1,
                'skill': 'Electrical Safety & Multimeter Diagnostics',
                'skill_kannada': 'ವಿದ್ಯುತ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಮಲ್ಟಿಮೀಟರ್ ಬಳಕೆ',
                'skill_hindi': 'विद्युत सुरक्षा एवं मल्टीमीटर डायग्नोस्टिक्स',
                'estimated_hours': 5,
                'description': 'Safety gear, grounding, MCB operations, voltage and continuity testing using multimeter.',
                'free_resource': 'Home Electrical Safety and Measurement Workshop (Video)',
                'resource_type': 'Hands-on guide',
                'milestone': 'Safely diagnose continuity and voltage on 5 appliances.'
            },
            {
                'step_number': 2,
                'skill': 'Domestic Wiring & Switchboard Assembly',
                'skill_kannada': 'ಮನೆ ವೈರಿಂಗ್ ಮತ್ತು ಸ್ವಿಚ್‌ಬೋರ್ಡ್ ಜೋಡಣೆ',
                'skill_hindi': 'घरेलू वायरिंग एवं स्विचबोर्ड असेंबली',
                'estimated_hours': 12,
                'description': 'Single-phase wiring, inverter hookup, conduit piping, fan and lighting fixture installations.',
                'free_resource': 'Practical Village Electrician Handbook (Kannada / Hindi)',
                'resource_type': 'Practical workbook',
                'milestone': 'Assemble and test a 4-switch, 1-plug distribution board.'
            },
            {
                'step_number': 3,
                'skill': 'Motor & Pump Starter Troubleshooting',
                'skill_kannada': 'ಕೃಷಿ ಪಂಪ್ ಮತ್ತು ಮೋಟರ್ ಸ್ಟಾರ್ಟರ್ ದುರಸ್ತಿ',
                'skill_hindi': 'कृषि मोटर एवं पंप स्टार्टर समस्या निवारण',
                'estimated_hours': 10,
                'description': 'Agricultural pump starters, capacitors, single-phase motor testing and relay maintenance.',
                'free_resource': 'Rural Agricultural Pump Repair Module',
                'resource_type': 'Field demonstration video',
                'milestone': 'Troubleshoot and fix common pump start trip issues.'
            }
        ]
    },
    'retail sales': {
        'title': 'Retail Store Management & POS Specialist',
        'title_kannada': 'ಚಿಲ್ಲರೆ ಅಂಗಡಿ ನಿರ್ವಹಣೆ ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆ',
        'title_hindi': 'रिटेल स्टोर प्रबंधन एवं पीओएस विशेषज्ञ',
        'target_roles': ['Retail Store Supervisor', 'Billing & Counter Executive', 'Inventory Associate'],
        'income_potential': {
            'current_avg': 8500,
            'after_completion_avg': 17000,
            'increase_percent': 100
        },
        'steps': [
            {
                'step_number': 1,
                'skill': 'Customer Communication & Upselling',
                'skill_kannada': 'ಗ್ರಾಹಕರೊಂದಿಗೆ ಸೌಹಾರ್ದಯುತ ಮಾತುಕತೆ',
                'skill_hindi': 'ग्राहक संचार एवं सौहार्दपूर्ण सेवा',
                'estimated_hours': 4,
                'description': 'Greeting, active listening, understanding customer needs, courteous problem resolution.',
                'free_resource': 'Customer Delight in Local Retail (Audio Guide)',
                'resource_type': 'Audio-visual guide',
                'milestone': 'Roleplay 5 common customer scenarios.'
            },
            {
                'step_number': 2,
                'skill': 'POS Barcode Billing & Digital Payments',
                'skill_kannada': 'ಡಿಜಿಟಲ್ ಪಾವತಿ (UPI/QR) ಮತ್ತು ಬಾರ್‌ಕೋಡ್ ಬಿಲ್ಲಿಂಗ್',
                'skill_hindi': 'पीओएस बारकोड बिलिंग एवं डिजिटल भुगतान (UPI)',
                'estimated_hours': 6,
                'description': 'UPI soundbox reconciliation, barcode scanning, POS software billing and cash register balancing.',
                'free_resource': 'Digital Payment & Store Billing Simulator',
                'resource_type': 'Hands-on practice app',
                'milestone': 'Generate 10 error-free retail invoices.'
            },
            {
                'step_number': 3,
                'skill': 'Inventory & Stock Expiry Management',
                'skill_kannada': 'ದಾಸ್ತಾನು ಮತ್ತು ಸರಕು ನಿರ್ವಹಣೆ',
                'skill_hindi': 'इन्वेंट्री एवं स्टॉक एक्सपायरी प्रबंधन',
                'estimated_hours': 6,
                'description': 'FIFO (First In First Out) principle, expiry date audits, supplier receiving verification.',
                'free_resource': 'Small Business Stock Management Checklist',
                'resource_type': 'Checklist & guide',
                'milestone': 'Conduct a complete shelf audit and record discrepancy report.'
            }
        ]
    },
    'solar installation': {
        'title': 'Rooftop Solar & Renewable Energy Technician',
        'title_kannada': 'ಸೌರಶಕ್ತಿ ಉಪಕರಣ ಅಳವಡಿಕೆ ತರಬೇತಿ',
        'title_hindi': 'रूफटॉप सोलर एवं नवीकरणीय ऊर्जा तकनीशियन',
        'target_roles': ['Solar PV Installer', 'Rooftop Maintenance Technician', 'Solar Water Heater Technician'],
        'income_potential': {
            'current_avg': 10000,
            'after_completion_avg': 22000,
            'increase_percent': 120
        },
        'steps': [
            {
                'step_number': 1,
                'skill': 'Solar Panel Mounting & Structure Assembly',
                'skill_kannada': 'ಸೌರ ಫಲಕಗಳ ಅಳವಡಿಕೆ ಮತ್ತು ಭದ್ರತೆ',
                'skill_hindi': 'सोलर पैनल माउंटिंग एवं स्ट्रक्चर असेंबली',
                'estimated_hours': 8,
                'description': 'Roof structural evaluation, panel angle orientation for maximum sunlight, mechanical clamping.',
                'free_resource': 'Solar Rooftop Installation Practical Guide (PM Surya Ghar)',
                'resource_type': 'Video + guide',
                'milestone': 'Align and mount dummy panel with optimal south-facing tilt.'
            },
            {
                'step_number': 2,
                'skill': 'DC Cabling, Inverter & Battery Connections',
                'skill_kannada': 'ಇನ್ವರ್ಟರ್ ಮತ್ತು ಬ್ಯಾಟರಿ ವೈರಿಂಗ್',
                'skill_hindi': 'डीसी केबलिंग, इन्वर्टर एवं बैटरी कनेक्शन',
                'estimated_hours': 10,
                'description': 'MC4 connector crimping, DC surge protector installation, inverter setup and lithium battery wiring.',
                'free_resource': 'Solar Inverter Wiring & Safety Standards',
                'resource_type': 'Technical blueprint & workshop video',
                'milestone': 'Crimp MC4 connectors and connect battery pack to inverter.'
            }
        ]
    }
}


def analyze_skill_gap(candidate_skills: List[Any], target_job_or_category: str) -> Dict[str, Any]:
    """
    Compare candidate's skills against target role and generate an actionable learning path.
    """
    norm_target = target_job_or_category.lower().strip()
    
    # Extract candidate skill names
    cand_skill_names = set()
    for s in candidate_skills:
        if isinstance(s, dict):
            cand_skill_names.add(s.get('name', '').lower().strip())
        elif isinstance(s, str):
            cand_skill_names.add(s.lower().strip())

    # Find matching roadmap template
    matched_key = 'computer operator'  # fallback default
    for key in ROADMAP_DATABASE.keys():
        if key in norm_target or any(k in key for k in norm_target.split()):
            matched_key = key
            break

    template = ROADMAP_DATABASE[matched_key]
    
    steps = []
    missing_skills = []
    completed_steps = 0
    total_hours = 0

    for step in template['steps']:
        skill_name = step['skill'].lower()
        is_acquired = False
        for cs in cand_skill_names:
            if cs in skill_name or any(word in cs for word in skill_name.split() if len(word) > 4):
                is_acquired = True
                break

        step_dict = dict(step)
        step_dict['is_acquired'] = is_acquired
        steps.append(step_dict)

        if not is_acquired:
            missing_skills.append(step['skill'])
            total_hours += step['estimated_hours']
        else:
            completed_steps += 1

    progress_percent = int((completed_steps / max(1, len(steps))) * 100)

    est_days = max(3, total_hours // 2)
    after_income = template['income_potential']['after_completion_avg']

    return {
        'roadmap_title': template['title'],
        'roadmap_title_kannada': template['title_kannada'],
        'roadmap_title_hindi': template.get('title_hindi', template['title']),
        'target_roles': template['target_roles'],
        'current_readiness_percent': progress_percent,
        'missing_skills': missing_skills,
        'total_estimated_hours': total_hours,
        'estimated_days': est_days,
        'steps': steps,
        'income_potential': template['income_potential'],
        'motivation_message': f"By dedicating ~{total_hours} hours over {est_days} days, you can unlock jobs paying up to ₹{after_income:,}/month!",
        'motivation_message_kannada': f"ಕೇವಲ ~{total_hours} ಗಂಟೆಗಳನ್ನು {est_days} ದಿನಗಳಲ್ಲಿ ಮೀಸಲಿಡುವ ಮೂಲಕ ನೀವು ಮಾಸಿಕ ₹{after_income:,} ವರೆಗಿನ ಉದ್ಯೋಗಗಳನ್ನು ಪಡೆಯಬಹುದು!",
        'motivation_message_hindi': f"मात्र {est_days} दिनों में ~{total_hours} घंटे समर्पित करके आप ₹{after_income:,}/माह तक के वेतन वाले रोजगार प्राप्त कर सकते हैं!"
    }
