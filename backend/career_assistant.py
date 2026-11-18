import os
import json
from typing import Dict, Any, List

# Pre-packaged trilingual (English, Kannada, Hindi) career guidance knowledge base for rural youth
INTENT_RESPONSES = [
    {
        'keywords': ['puc', '12th', '10th', 'education', 'qualification', 'degree', 'ಓದು', 'ವಿದ್ಯಾರ್ಹತೆ', '10वीं', '12वीं', 'शिक्षा', 'योग्यता', 'पढ़ाई'],
        'reply_en': "With a 10th or PUC/12th qualification, you have strong opportunities in local enterprises! Common high-demand roles include:\n1. Computer & Billing Operator in Grama One or retail centers (₹12,000 - ₹18,000/mo)\n2. Workshop / Electrical Assistant with on-the-job training (₹10,000 - ₹16,000/mo)\n3. Local logistics & delivery executive (₹14,000 - ₹20,000/mo)\n4. Agricultural equipment operator or dairy supervisor.\nEmployers in your area value dependability and willingness to learn practical skills over high degrees.",
        'reply_kn': "10ನೇ ತರಗತಿ ಅಥವಾ ಪಿಯುಸಿ ಉತ್ತೀರ್ಣರಾಗಿದ್ದರೆ ಗ್ರಾಮೀಣ ಮತ್ತು ಪಟ್ಟಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಉತ್ತಮ ಉದ್ಯೋಗಾವಕಾಶಗಳಿವೆ:\n1. ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಅಂಗಡಿಗಳಲ್ಲಿ ಕಂಪ್ಯೂಟರ್/ಬಿಲ್ಲಿಂಗ್ ಆಪರೇಟರ್ (₹12,000 - ₹18,000)\n2. ಎಲೆಕ್ಟ್ರಿಕಲ್ ವರ್ಕ್‌ಶಾಪ್ ಸಹಾಯಕ (₹10,000 - ₹16,000)\n3. ಡೆಲಿವರಿ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಕೆಲಸಗಳು (₹14,000 - ₹20,000)\nಸ್ಥಳೀಯ ಉದ್ಯೋಗದಾತರು ಪದವಿಗಿಂತ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯ ಮತ್ತು ಪ್ರಾಮಾಣಿಕತೆಗೆ ಹೆಚ್ಚು ಆದ್ಯತೆ ನೀಡುತ್ತಾರೆ.",
        'reply_hi': "10वीं या 12वीं (PUC) उत्तीर्ण होने पर ग्रामीण एवं कस्बाई क्षेत्रों में बेहतरीन रोजगार के अवसर उपलब्ध हैं:\n1. ग्राम पंचायत/दुकानों में कंप्यूटर एवं बिलिंग ऑपरेटर (₹12,000 - ₹18,000/माह)\n2. इलेक्ट्रिकल वर्कशॉप सहायक एवं वायरिंग ट्रेनी (₹10,000 - ₹16,000/माह)\n3. स्थानीय डिलीवरी और लॉजिस्टिक्स कार्य (₹14,000 - ₹20,000/माह)\n4. कृषि उपकरण ऑपरेटर अथवा डेयरी सुपरवाइजर।\nस्थानीय नियोक्ता बड़ी डिग्री के बजाय आपकी काम सीखने की लगन और व्यावहारिक कौशल को प्राथमिकता देते हैं।",
        'suggested_category': 'Office & Computer'
    },
    {
        'keywords': ['skill', 'learn', 'grow', 'career', 'ಕೌಶಲ್ಯ', 'ಕಲಿಯುವುದು', 'ಮುಂದೆ', 'कौशल', 'सीखना', 'हुनर', 'कमाई', 'आगे बढ़ना'],
        'reply_en': "To increase your income quickly in rural and semi-urban areas, consider these 3 high-demand practical skills:\n1. Basic Solar PV & Inverter Maintenance (Huge demand due to rural solar pumps and rooftop solar)\n2. Computer Spreadsheets + Digital Payments (Every retail shop and cooperative society needs billing staff)\n3. Multi-brand two-wheeler & electric vehicle (EV) basic servicing.\nLearning any of these for 2-3 weeks can boost your monthly income from ₹9,000 to over ₹18,000!",
        'reply_kn': "ಗ್ರಾಮೀಣ ಭಾಗದಲ್ಲಿ ನಿಮ್ಮ ಆದಾಯವನ್ನು ದ್ವಿಗುಣಗೊಳಿಸಲು ಈ 3 ಪ್ರಮುಖ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ:\n1. ಸೌರ ಫಲಕ (Solar PV) ಮತ್ತು ಇನ್ವರ್ಟರ್ ದುರಸ್ತಿ (ಕೃಷಿ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಭಾರೀ ಬೇಡಿಕೆ)\n2. ಎಕ್ಸೆಲ್ ಸ್ಪ್ರೆಡ್‌ಶೀಟ್ ಮತ್ತು ಆನ್‌ಲೈನ್ ಬಿಲ್ಲಿಂಗ್ (ಎಲ್ಲಾ ಅಂಗಡಿಗಳಿಗೆ ಅಗತ್ಯ)\n3. ದ್ವಿಚಕ್ರ ವಾಹನ ಮತ್ತು ಇವಿ ಸರ್ವಿಸಿಂಗ್.\nನಮ್ಮ 'ಸ್ಕಿಲ್ ಗ್ಯಾಪ್ ಅನಲೈಜರ್' ನಲ್ಲಿ ಉಚಿತ ವೀಡಿಯೊ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
        'reply_hi': "ग्रामीण क्षेत्रों में अपनी आय तेजी से बढ़ाने के लिए ये 3 व्यावहारिक कौशल सीखें:\n1. सोलर पैनल (Solar PV) एवं इन्वर्टर रिपेयरिंग (कृषि पंपों के कारण अत्यधिक मांग)\n2. एक्सेल स्प्रेडशीट एवं डिजिटल बिलिंग (सभी खुदरा दुकानों और सहकारी समितियों में मांग)\n3. दोपहिया एवं इलेक्ट्रिक वाहन (EV) बेसिक सर्विसिंग।\nहमारे 'स्किल गैप एनालाइजर' में 2-3 सप्ताह के मुफ्त वीडियो देखकर अपनी मासिक आय ₹9,000 से ₹20,000 तक बढ़ाएं!",
        'suggested_category': 'Electrical & Repair'
    },
    {
        'keywords': ['interview', 'prepare', 'talk', 'employer', 'ಸಂದರ್ಶನ', 'ಮಾತನಾಡುವುದು', 'इंटरव्यू', 'साक्षात्कार', 'बातचीत', 'मालिक'],
        'reply_en': "Tips for interviewing with local employers and small business owners:\n1. Be punctual and dress neat, simple and professional.\n2. Emphasize your practical experience (e.g. 'I have repaired home wiring', 'I handle mobile payments daily').\n3. Confirm your travel availability: Mention clearly if you have a bicycle/two-wheeler or live nearby.\n4. Ask about work hours and learning opportunities: Local employers love candidates who show eagerness to master new tasks.",
        'reply_kn': "ಸ್ಥಳೀಯ ಮಾಲೀಕರೊಂದಿಗೆ ಸಂದರ್ಶನಕ್ಕೆ ಪ್ರಮುಖ ಸಲಹೆಗಳು:\n1. ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಹೋಗಿ, ಸ್ವಚ್ಛವಾದ ಉಡುಪು ಧರಿಸಿ.\n2. ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಅನುಭವವನ್ನು ನೇರವಾಗಿ ವಿವರಿಸಿ (ಉದಾ: 'ನಾನು ಮನೆಯ ವೈರಿಂಗ್ ಕೆಲಸ ಮಾಡಿದ್ದೇನೆ').\n3. ನಿಮ್ಮ ಬರುವ-ಹೋಗುವ ವ್ಯವಸ್ಥೆಯನ್ನು ಸ್ಪಷ್ಟಪಡಿಸಿ (ಹತ್ತಿರದ ಮನೆ, ಬೈಕ್ ಇತ್ಯಾದಿ).\n4. ಕೆಲಸ ಕಲಿಯುವ ಉತ್ಸಾಹವನ್ನು ತೋರಿಸಿ.",
        'reply_hi': "स्थानीय नियोक्ताओं और व्यवसायियों से साक्षात्कार (इंटरव्यू) हेतु प्रमुख सुझाव:\n1. समय पर पहुंचे और सादे, साफ-सुथरे कपड़े पहनें।\n2. अपने व्यावहारिक अनुभव को खुलकर बताएं (जैसे: 'मैंने घरेलू वायरिंग का काम किया है', 'मैं मोबाइल भुगतान संभाल लेता हूँ')।\n3. आने-जाने की सुविधा स्पष्ट करें (साइकिल/बाइक अथवा पास का गांव)।\n4. नया काम सीखने का उत्साह दिखाएं।",
        'suggested_category': 'Retail'
    },
    {
        'keywords': ['village', 'near', 'distance', 'home', 'ಗ್ರಾಮ', 'ಹಳ್ಳಿ', 'ಹತ್ತಿರ', 'गांव', 'हल्ली', 'पास', 'नजदीक', 'दूरी'],
        'reply_en': "You don't need to migrate to big cities like Bengaluru or Mumbai to earn decently! Local micro-economies have rising demand for:\n- Micro-harvesting & agro-processing supervisors\n- Retail distribution and customer support\n- Local clinic/pharmacy assistants\n- Mobile & electrical repair shops.\nCheck our interactive Map Discovery to view verified vacancies within 5 to 15 km of your village.",
        'reply_kn': "ಉದ್ಯೋಗಕ್ಕಾಗಿ ಬೆಂಗಳೂರು ಅಥವಾ ದೂರದ ನಗರಗಳಿಗೆ ಹೋಗಬೇಕಾಗಿಲ್ಲ! ನಿಮ್ಮ ಹಳ್ಳಿಯ ಸುತ್ತಮುತ್ತ (5-15 ಕಿ.ಮೀ):\n- ಕೃಷಿ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಹಾರ್ವೆಸ್ಟಿಂಗ್ ಕೆಲಸಗಳು\n- ಸ್ಥಳೀಯ ಮೊಬೈಲ್ ಮತ್ತು ಎಲೆಕ್ಟ್ರಿಕಲ್ ಶಾಪ್‌ಗಳು\n- ಮೆಡಿಕಲ್ ಸ್ಟೋರ್ ಮತ್ತು ಚಿಲ್ಲರೆ ಅಂಗಡಿಗಳಲ್ಲಿ ಅವಕಾಶಗಳಿವೆ.\nನಮ್ಮ 'ಮ್ಯಾಪ್ ಡಿಸ್ಕವರಿ' ಬಳಸಿ ನಿಮ್ಮ ಗ್ರಾಮದ ಸಮೀಪದ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ.",
        'reply_hi': "अच्छी कमाई के लिए बड़े शहरों में पलायन करने की आवश्यकता नहीं है! आपके गांव के 5-15 किमी के दायरे में मांग है:\n- कृषि प्रसंस्करण एवं फसल कटाई पर्यवेक्षक\n- खुदरा वितरण एवं किराना स्टोर काउंटर\n- मोबाइल व इलेक्ट्रिकल रिपेयरिंग शॉप।\nहमारे इंटरैक्टिव 'रोजगार मानचित्र (Discover Map)' का उपयोग कर अपने नजदीकी सत्यापित अवसर खोजें।",
        'suggested_category': 'Agriculture'
    },
    {
        'keywords': ['resume', 'cv', 'biodata', 'ರೆಸ್ಯೂಮ್', 'ಬಯೋಡೇಟಾ', 'बायोडाटा', 'रिज्यूम', 'सीवी'],
        'reply_en': "On RuralConnect AI, you don't even need a formal resume to apply! Your Skill Passport captures:\n- Practical skills and hands-on projects\n- Verified phone number and village location\n- Education and languages\nIf an employer requests a physical biodata, use our 1-Click Resume Builder from your profile to download a clean, professional PDF instantly.",
        'reply_kn': "RuralConnect AI ನಲ್ಲಿ ಕೆಲಸಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ರೆಸ್ಯೂಮ್ ಕಡ್ಡಾಯವಲ್ಲ!\nನಿಮ್ಮ 'ಸ್ಕಿಲ್ ಪಾಸ್‌ಪೋರ್ಟ್' ನಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳನ್ನು ದಾಖಲಿಸಲಾಗುತ್ತದೆ.\nಮಾಲೀಕರು ಬಯೋಡೇಟಾ ಕೇಳಿದರೆ, ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿರುವ '1-ಕ್ಲಿಕ್ ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್' ಬಳಸಿ ಸುಲಭವಾಗಿ PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು.",
        'reply_hi': "RuralConnect AI पर नौकरी आवेदन के लिए औपचारिक रिज्यूम अनिवार्य नहीं है!\nआपके 'स्किल पासपोर्ट' में आपके व्यावहारिक कौशल सीधे दर्ज होते हैं।\nयदि नियोक्ता भौतिक बायोडाटा मांगते हैं, तो अपने प्रोफाइल से '1-क्लिक रिज्यूम बिल्डर' का उपयोग कर तुरंत पेशेवर PDF डाउनलोड करें।",
        'suggested_category': 'Office & Computer'
    }
]

def query_career_guide(user_query: str, language: str = 'en', user_profile: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Intelligent Rural Career Guide engine.
    Supports English, Kannada & Hindi.
    Evaluates query intent, extracts skill matches, and returns structured advice.
    """
    clean_q = user_query.lower().strip()
    selected_reply_en = None
    selected_reply_kn = None
    selected_reply_hi = None
    matched_category = 'General'

    for item in INTENT_RESPONSES:
        if any(kw in clean_q for kw in item['keywords']):
            selected_reply_en = item['reply_en']
            selected_reply_kn = item['reply_kn']
            selected_reply_hi = item.get('reply_hi')
            matched_category = item.get('suggested_category', 'General')
            break

    if not selected_reply_en:
        name = user_profile.get('name', 'Friend') if user_profile else 'Friend'
        skills_summary = ", ".join([s['name'] if isinstance(s, dict) else s for s in user_profile.get('skills', [])]) if user_profile and user_profile.get('skills') else 'practical hands-on skills'
        
        selected_reply_en = f"Namaskara {name}! Based on your interest in '{user_query}', our system recommends looking into opportunities matching {skills_summary}. In rural and taluk centers, employers value punctual, eager learners. Would you like to check matching local vacancies, explore free practical learning modules, or generate your professional biodata?"
        selected_reply_kn = f"ನಮಸ್ಕಾರ {name}! '{user_query}' ಕುರಿತ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ, ಸ್ಥಳೀಯವಾಗಿ ಬೇಡಿಕೆಯಿರುವ ಕೆಲಸಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ನಾವು ಶಿಫಾರಸು ಮಾಡುತ್ತೇವೆ. ನಿಮ್ಮ ಪ್ರಾಯೋಗಿಕ ಕೌಶಲ್ಯಗಳಿಗೆ ಸೂಕ್ತವಾದ ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳನ್ನು ನೋಡಲು ಬಯಸುವಿರಾ ಅಥವಾ ಕೌಶಲ್ಯ ಸುಧಾರಣಾ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಬಯಸುವಿರಾ?"
        selected_reply_hi = f"नमस्ते {name}! '{user_query}' पर आपके प्रश्न के आधार पर, हमारा सिस्टम {skills_summary} से जुड़े स्थानीय अवसरों की अनुशंसा करता है। क्या आप आस-पास के रोजगार देखना चाहते हैं या अपना 1-क्लिक बायोडाटा तैयार करना चाहते हैं?"

    if language == 'kn':
        response_text = selected_reply_kn
    elif language == 'hi':
        response_text = selected_reply_hi or selected_reply_en
    else:
        response_text = selected_reply_en

    return {
        'query': user_query,
        'language': language,
        'response': response_text,
        'suggested_category': matched_category,
        'mode': 'intelligent_rural_nlp_engine',
        'voice_supported': True
    }
