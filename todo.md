# Project TODO

- [x] วิเคราะห์ repository ต้นทางและกำหนดขอบเขต mobile companion app
- [x] เขียนแผน interface design สำหรับการใช้งาน portrait และมือเดียว
- [x] สร้าง Dashboard สำหรับภาพรวม ward และสถานะระบบ
- [x] สร้าง Alerts list พร้อม acknowledge และ resolve flow
- [x] สร้าง Patients list, search/filter และ Patient detail
- [x] สร้าง Activity timeline แบบอ่านอย่างเดียว
- [x] สร้าง Settings สำหรับ ward label และ reset demo data
- [x] เพิ่ม local-first state และ persistence ด้วย AsyncStorage
- [x] ปรับ theme, typography, icon mapping และ app branding
- [x] เพิ่ม custom app logo และอัปเดต app.config.ts
- [x] เพิ่ม unit tests สำหรับโมเดลข้อมูลและ lifecycle states
- [x] ตรวจสอบ TypeScript, lint, tests และ visual preview
- [x] สร้าง checkpoint พร้อมสรุปข้อจำกัดและวิธีทดสอบ

## Proposed IPD Smart Sentinel phase

- [ ] ออกแบบ SBAR Shift Handover Digest พร้อม clinical review gate
- [ ] ออกแบบ Bedside-Clear Snooze ที่แยก mute alarm ออกจากการยืนยันถึงเตียง
- [ ] ออกแบบ temporary high-fall-risk activity tag สำหรับเข้าห้องน้ำ/กายภาพ
- [ ] ออกแบบ silent battery hot-swap queue และการแจ้งเตือนแบบไม่สร้าง alarm fatigue
- [ ] ออกแบบ zero-typing bedside quick-tags และ audit event schema
- [ ] ตรวจสอบข้ออ้างเชิงสถิติและ ROI กับข้อมูลโรงพยาบาลจริงก่อนใช้ในเอกสารผู้บริหาร
- [ ] กำหนด HL7 FHIR profile, authentication, authorization, idempotency และ reconciliation contract ก่อนเชื่อม HIS/EMR
- [ ] กำหนด clinical safety validation, alarm governance และ pilot acceptance criteria
