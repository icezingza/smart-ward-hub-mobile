# Smart Ward Hub Mobile — Interface Design Plan

## Product direction

Smart Ward Hub Mobile เป็นแอปผู้ช่วยสำหรับบุคลากรหน้างานในหอผู้ป่วย โดยลดความซับซ้อนของระบบต้นทางให้เหลือข้อมูลที่ต้องตัดสินใจทันที ได้แก่ สถานะวอร์ด ผู้ป่วยที่ต้องติดตาม การแจ้งเตือนที่ยังไม่ปิด และประวัติเหตุการณ์แบบอ่านง่าย แอปช่วงแรกจะใช้ข้อมูลตัวอย่างแบบ deterministic และโครงสร้าง local-first เพื่อให้ทดสอบ flow ได้โดยไม่ผูกกับ backend หรือบัญชีผู้ใช้จนกว่าจะมีข้อกำหนดเพิ่มเติม

## Screen list

| Screen | Primary content and functionality |
|---|---|
| Dashboard | แสดงชื่อวอร์ด สถานะระบบแบบ online/standby จำนวนผู้ป่วยทั้งหมด จำนวน alert ที่ยังเปิด และรายการเหตุการณ์ล่าสุด พร้อมปุ่มลัดไปยัง Alerts และ Patients |
| Alerts | แสดง alert แบบเรียงตามความเร่งด่วน แยกสถานะ Open/Acknowledged/Resolved และให้ผู้ใช้กดรับทราบหรือปิดรายการได้ โดยมี confirmation และเวลาอัปเดตล่าสุด |
| Patients | แสดงรายชื่อ/รหัสเตียง สถานะทั่วไป และ tag ที่ต้องติดตาม ใช้ search/filter แบบสั้น ๆ และแตะเพื่อดูรายละเอียด |
| Patient detail | แสดงข้อมูลที่จำเป็นต่อการติดตาม เช่น เตียง ระดับความเสี่ยง สัญญาณล่าสุด เหตุการณ์ล่าสุด และปุ่มสร้าง note ในเครื่อง โดยหลีกเลี่ยงการแสดงข้อมูลระบุตัวบุคคลจริง |
| Activity | แสดง audit timeline แบบอ่านอย่างเดียว เช่น alert created, acknowledged, resolved และ sync status พร้อมตัวกรองตามวัน |
| Settings | ตั้งค่าวอร์ดที่กำลังใช้งาน โหมดข้อมูลตัวอย่าง/โหมด local และคำอธิบายข้อจำกัดของแอป รวมถึงปุ่ม reset ข้อมูลตัวอย่างแบบมี confirmation |

## Navigation

ใช้ tab bar แบบ iOS ที่มี 4 จุดหลัก ได้แก่ Dashboard, Alerts, Patients และ Activity ส่วน Settings เปิดจากปุ่ม gear บน Dashboard หรือ header ของแต่ละหน้าที่เกี่ยวข้อง ไม่เพิ่มเมนูซ้อนหลายชั้นและไม่ใช้ drawer เพื่อให้ใช้งานมือเดียวได้ง่าย

## Key user flows

1. ผู้ใช้เปิดแอป → Dashboard → เห็นจำนวน alert เปิดอยู่ → แตะการ์ด Alerts → แตะรายการเร่งด่วน → แตะ Acknowledge → สถานะเปลี่ยนทันทีและ Activity เพิ่ม event ใหม่
2. ผู้ใช้เปิด Dashboard → แตะ Patients → ค้นหาหมายเลขเตียง → แตะผู้ป่วย → อ่านสถานะล่าสุด → เพิ่ม note ในเครื่อง → กลับไป Patients โดยยังคง filter เดิม
3. ผู้ใช้เปิด Alerts → เลือก filter Open → ปัด/แตะรายการ → เลือก Resolve → เห็น confirmation → รายการถูกย้ายไป Resolved และมี timestamp ใน Activity
4. ผู้ใช้เปิด Settings → เปลี่ยน ward label หรือ reset demo data → ยืนยันผ่าน confirmation sheet → Dashboard แสดงค่าที่อัปเดตโดยไม่ทำให้ข้อมูลหลักอื่นหายโดยไม่ตั้งใจ

## Visual and interaction system

สีหลักใช้ **Deep Navy #102A43** สำหรับ header และข้อความสำคัญ, **Teal #0F766E** เป็น action color, **Mint #DFF7F2** เป็น surface ที่สื่อถึงระบบปกติ, **Amber #B45309** สำหรับ warning และ **Red #B42318** สำหรับ critical alert บนพื้นหลัง **#F7FAFC** และ card สี **#FFFFFF** เส้นขอบ **#D9E2EC** ตัวอักษรหลัก **#102A43** และรอง **#627D98** เพื่อให้คอนทราสต์สูงและอ่านได้ในสภาพแสงวอร์ด

ทุกหน้าจะใช้ portrait 9:16, safe area, ระยะกดขั้นต่ำประมาณ 44pt, ปุ่มหลักอยู่ในช่วงล่างของจอเพื่อใช้นิ้วโป้ง และใช้ card ที่มีมุม 16pt โดยไม่ใส่ข้อมูลแน่นเกินไป สถานะสำคัญต้องสื่อด้วยทั้งสีและข้อความ ไม่พึ่งสีอย่างเดียว ปุ่มทุกปุ่มต้องมี pressed feedback และการเปลี่ยนสถานะต้องมีข้อความยืนยันสั้น ๆ

## Data vocabulary

```text
Ward: id, name, mode, lastSyncAt
Alert: id, patientId, severity, title, status, createdAt, acknowledgedAt, resolvedAt
Patient: id, bed, displayCode, riskLevel, latestReading, note
Activity: id, type, entityId, timestamp, actorLabel
```

## Scope boundary

เวอร์ชันแรกไม่วินิจฉัยโรค ไม่ส่งคำแนะนำทางการแพทย์ ไม่เชื่อมต่ออุปกรณ์จริง และไม่ถือเป็นระบบ clinical-grade production จนกว่าจะมีการตรวจสอบ integration, identity, audit, network failure, privacy และ clinical validation เพิ่มเติม
