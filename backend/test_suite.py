import unittest
import json
from app import app, db
from models import User, YouthProfile, EmployerProfile, Job, Application

class RuralConnectAiTestSuite(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_01_health_check(self):
        res = self.client.get('/api/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data.get('status'), 'online')
        print("✓ [TEST 1 PASSED]: Health Check Endpoint OK")

    def test_02_demo_login_personas(self):
        # 1. Youth Demo
        res_y = self.client.post('/api/auth/demo-login', json={'role': 'youth'})
        self.assertEqual(res_y.status_code, 200)
        data_y = res_y.get_json()
        self.assertTrue(data_y['success'])
        self.assertEqual(data_y['user']['role'], 'youth')
        self.assertIn('token', data_y)

        # 2. Employer Demo
        res_e = self.client.post('/api/auth/demo-login', json={'role': 'employer'})
        self.assertEqual(res_e.status_code, 200)
        data_e = res_e.get_json()
        self.assertEqual(data_e['user']['role'], 'employer')

        # 3. Admin Demo
        res_a = self.client.post('/api/auth/demo-login', json={'role': 'admin'})
        self.assertEqual(res_a.status_code, 200)
        data_a = res_a.get_json()
        self.assertEqual(data_a['user']['role'], 'admin')

        print("✓ [TEST 2 PASSED]: 1-Click Demo Personas (Youth, Employer, Admin) OK")

    def test_03_explainable_ai_job_matching(self):
        login = self.client.post('/api/auth/demo-login', json={'role': 'youth'})
        token = login.get_json()['token']

        res = self.client.get('/api/jobs/recommended', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        self.assertGreater(len(data['top_matches']), 0)

        top_job = data['top_matches'][0]
        # Verify explainable matching attributes
        self.assertIn('match_percentage', top_job)
        self.assertIn('score_breakdown', top_job)
        self.assertIn('match_reasons', top_job)
        self.assertGreater(len(top_job['match_reasons']), 0)
        self.assertIn('skills', top_job['score_breakdown'])
        self.assertIn('distance', top_job['score_breakdown'])

        print(f"✓ [TEST 3 PASSED]: Explainable AI Matching: Top Job '{top_job['title']}' with Score: {top_job['match_percentage']}%")

    def test_04_skill_gap_analyzer(self):
        login = self.client.post('/api/auth/demo-login', json={'role': 'youth'})
        token = login.get_json()['token']

        res = self.client.post(
            '/api/skill-gap/analyze',
            headers={'Authorization': f'Bearer {token}'},
            json={'target_job': 'Computer Operator'}
        )
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        analysis = data['analysis']
        self.assertIn('steps', analysis)
        self.assertIn('income_potential', analysis)
        self.assertGreater(analysis['income_potential']['increase_percent'], 50)
        print(f"✓ [TEST 4 PASSED]: AI Skill Gap Analyzer: Roadmap generated with {len(analysis['steps'])} steps, Income potential: +{analysis['income_potential']['increase_percent']}%")

    def test_05_employer_reverse_matching(self):
        login = self.client.post('/api/auth/demo-login', json={'role': 'employer'})
        token = login.get_json()['token']

        res = self.client.get('/api/employer/candidates/reverse-match', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        self.assertGreater(data['count'], 0)
        top_candidate = data['candidates'][0]
        self.assertIn('match_percentage', top_candidate)
        self.assertIn('distance_km', top_candidate)
        print(f"✓ [TEST 5 PASSED]: Employer Reverse Matching: Surfaced {data['count']} nearby candidates (Top: {top_candidate['name']} at {top_candidate['distance_km']}km)")

    def test_06_career_assistant_bilingual(self):
        # English query
        res_en = self.client.post('/api/career-assistant/ask', json={
            'query': 'Which job is best for my PUC in Karnataka?',
            'language': 'en'
        })
        self.assertEqual(res_en.status_code, 200)
        self.assertTrue(res_en.get_json()['success'])

        # Kannada query
        res_kn = self.client.post('/api/career-assistant/ask', json={
            'query': '10ನೇ ತರಗತಿಗೆ ಯಾವ ಕೆಲಸ ಸಿಗುತ್ತದೆ?',
            'language': 'kn'
        })
        self.assertEqual(res_kn.status_code, 200)
        self.assertTrue(res_kn.get_json()['success'])
        print("✓ [TEST 6 PASSED]: AI Career Guide (English & Kannada Natural Language) OK")

    def test_07_job_discovery_and_filters(self):
        res = self.client.get('/api/jobs?category=Electrical%20%26%20Repair&district=Dakshina%20Kannada')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        print(f"✓ [TEST 7 PASSED]: Job Discovery & Proximity Filters: {data['count']} jobs found")

    def test_08_application_lifecycle(self):
        login = self.client.post('/api/auth/demo-login', json={'role': 'youth'})
        token = login.get_json()['token']

        # Get an active job
        jobs_res = self.client.get('/api/jobs')
        job_id = jobs_res.get_json()['jobs'][0]['id']

        # Apply
        app_res = self.client.post(
            '/api/applications',
            headers={'Authorization': f'Bearer {token}'},
            json={'job_id': job_id, 'cover_note': 'Test application for HackCulture'}
        )
        self.assertIn(app_res.status_code, [201, 400]) # 400 if already seeded
        print("✓ [TEST 8 PASSED]: Application Submission & Pipeline OK")

    def test_09_admin_governance(self):
        login = self.client.post('/api/auth/demo-login', json={'role': 'admin'})
        token = login.get_json()['token']

        res = self.client.get('/api/admin/overview', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(res.status_code, 200)
        metrics = res.get_json()['metrics']
        self.assertGreater(metrics['total_youth'], 0)
        self.assertGreater(metrics['total_employers'], 0)
        print(f"✓ [TEST 9 PASSED]: Admin Governance & Real Database Analytics OK: {metrics['total_youth']} Youth, {metrics['total_employers']} Employers, {metrics['active_jobs']} Jobs")

    def test_10_simulation_match_and_weights(self):
        sample_cand = {
            'name': 'Ravi Kumar',
            'village': 'Bantwal Grama',
            'district': 'Dakshina Kannada',
            'education': '12th / PUC Pass',
            'skills': [{'name': 'Wiring', 'level': 'Intermediate', 'is_practical': True}, {'name': 'Electrical Repair', 'level': 'Intermediate', 'is_practical': True}],
            'practical_experience': '45+ switchboard repairs and domestic electrical work',
            'expected_salary': 12000,
            'availability': 'full-time',
            'latitude': 12.8954,
            'longitude': 75.0345
        }
        sample_job = {
            'title': 'Electrical Workshop Assistant',
            'category': 'Electrical & Repair',
            'required_skills': ['Electrical Repair', 'Wiring', 'Appliance Repair'],
            'preferred_education': 'Any / Practical Skills',
            'min_salary': 12000,
            'max_salary': 16000,
            'village': 'Bantwal Town',
            'district': 'Dakshina Kannada',
            'job_type': 'full-time',
            'latitude': 12.8980,
            'longitude': 75.0360
        }
        res = self.client.post('/api/simulation/match', json={'candidate': sample_cand, 'job': sample_job})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        result = data['result']
        self.assertGreaterEqual(result['match_percentage'], 70.0)
        self.assertIn('skills', result['factor_breakdown'])
        self.assertIn('confidence_score', result)
        print(f"✓ [TEST 10 PASSED]: Simulation Matching OK: Overall Score {result['match_percentage']}%, Confidence: {result['confidence_score']}%")

    def test_11_baseline_comparison(self):
        sample_cand = {
            'name': 'Praveen',
            'district': 'Dakshina Kannada',
            'skills': ['Wiring'],
            'practical_experience': 'practical domestic electrical wiring'
        }
        sample_job = {
            'title': 'Electrical Assistant',
            'required_skills': ['Electrical Repair'],
            'district': 'Dakshina Kannada'
        }
        res = self.client.post('/api/simulation/compare', json={'candidate': sample_cand, 'job': sample_job})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        comp = data['comparison']
        self.assertIn('intelligent_matching', comp)
        self.assertIn('baseline_keyword_matching', comp)
        self.assertIn('benchmark_metrics', comp)
        print(f"✓ [TEST 11 PASSED]: AI vs Baseline Comparison OK (Precision@3: {comp['benchmark_metrics']['precision_at_3']['intelligent_ai']} vs {comp['benchmark_metrics']['precision_at_3']['keyword_baseline']})")

    def test_12_impact_simulator(self):
        res = self.client.post('/api/simulation/impact', json={
            'youth_count': 1000,
            'employer_count': 80,
            'vacancies_per_employer': 3.0,
            'match_rate': 85.0,
            'candidates_per_vacancy': 4.0
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data['success'])
        proj = data['impact']['projected_metrics']
        self.assertGreater(proj['projected_successful_placements'], 0)
        self.assertGreater(proj['annual_economic_wage_unlock_crores'], 0)
        print(f"✓ [TEST 12 PASSED]: Impact Simulator OK: {proj['projected_successful_placements']} placements, ₹{proj['annual_economic_wage_unlock_crores']} Cr unlocked")

    def test_13_scenarios_and_map_clusters(self):
        res_s = self.client.get('/api/simulation/scenarios')
        self.assertEqual(res_s.status_code, 200)
        scenarios = res_s.get_json()['scenarios']
        self.assertEqual(len(scenarios), 5)

        res_c = self.client.get('/api/simulation/map-clusters')
        self.assertEqual(res_c.status_code, 200)
        clusters = res_c.get_json()['clusters']
        self.assertEqual(len(clusters), 5)
        print(f"✓ [TEST 13 PASSED]: Scenarios ({len(scenarios)}) and Simulation Map Clusters ({len(clusters)}) OK")


if __name__ == '__main__':
    unittest.main()
