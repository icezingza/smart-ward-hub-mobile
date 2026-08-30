# Smart Ward Hub — Repository Analysis and Mobile Direction

## Executive summary

Repository ต้นทางเป็น **P0-hardened sovereign edge patient monitoring prototype** ที่เน้นระบบ edge ภายในวอร์ด ความปลอดภัยแบบ fail-closed การติดตาม telemetry, alerts, admission workflow, audit/evidence และการกู้คืนระบบ มากกว่าการเป็น consumer-facing mobile app โดยเอกสารและโค้ดชี้ว่าบทบาท mobile ที่เหมาะสมคือ **roaming tablet / ward operations companion** ซึ่งใช้ดู snapshot ล่าสุด รับทราบ alert และตรวจสอบกิจกรรม ไม่ใช่ source of truth ของ telemetry [1]

## What the repository already establishes

| Area | Evidence from repository | Mobile implication |
|---|---|---|
| Edge architecture | Fixed Edge Hub เป็น authoritative source ของ telemetry, session, alerts และ evidence | แอปควรแยกสถานะ Local demo/Connected และแสดง freshness ให้ชัด |
| Roaming workflow | Tablet ใช้สำหรับ walk-round, ดู alert, acknowledge/escalate และ NFC pointer lookup | ใช้ tab navigation สี่ส่วน: Overview, Alerts, Patients, Activity |
| Safety boundary | ไม่ควรให้ UI ประกาศ restored/green หาก heartbeat หรือ reconciliation ยังไม่พร้อม | แสดง disclaimer, status text และไม่ทำ clinical recommendation |
| Identity/privacy | Outside-facing UI ต้องไม่แสดง raw patient identity หลัง admission | ใช้ bed code และ display code แทนชื่อจริงใน prototype |
| Operational controls | Mutation มี command ID/idempotency/expected revision ในต้นทาง | รุ่นแรกทำ local state transition ให้ชัด ก่อนต่อ API จริง |
| Validation boundary | หลายส่วนยังเป็น software evidence และ integration/hardware/clinical validation ยัง unverified | ระบุชัดว่าแอปเป็น workflow prototype ไม่ใช่ clinical production system |

## Recommended product shape

เริ่มจากแอป **local-first, low-friction** ที่ผู้ใช้เปิดแล้วเห็นจำนวน alert สำคัญทันที จากนั้นแตะเข้า queue, รับทราบหรือปิดรายการ, ค้นเตียง, อ่าน timeline และตั้งค่า ward label ได้โดยไม่ต้องผ่านหลายชั้นของเมนู การเลือกใช้ local storage ช่วยให้พัฒนาและทดสอบ flow ได้โดยไม่สร้างข้อสมมติเรื่อง identity provider, HIS/FHIR, PKI, network หรือ hospital database ที่ repository ระบุว่ายังต้องตรวจสอบเพิ่มเติม

## Implemented in this mobile prototype

หน้า Overview แสดง ward status, open attention items, จำนวนผู้ป่วย และ recent activity หน้า Alerts รองรับ filter ตาม lifecycle และ action acknowledge/resolve หน้า Patients รองรับการค้นหาด้วย bed หรือ patient code และหน้า Activity แสดง audit timeline แบบอ่านอย่างเดียว หน้า Settings แก้ ward label และ reset demo data พร้อม confirmation โดย state ถูกเก็บด้วย AsyncStorage และใช้ข้อมูลตัวอย่างที่ไม่ระบุชื่อบุคคลจริง

## Not implemented by design

ยังไม่เชื่อมอุปกรณ์จริง, backend, authentication, push notification, HIS/FHIR, NFC, live telemetry, multi-device synchronization หรือ clinical decision support การนำไปใช้จริงต้องเพิ่ม authenticated gateway, source-of-truth snapshot contract, offline/reconciliation policy, privacy controls, audit integrity, integration validation, device management และ clinical validation ตาม readiness gates ของ repository

## References

[1]: https://github.com/icezingza/smart-ward-hub "icezingza/smart-ward-hub repository"
