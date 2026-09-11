# خطة منصة My Idea (Learning Hub)

هذا الملف بيوصف الحالة الحالية للمشروع + الشغل الجاري، مش خطة بداية من الصفر (المشروع شغال بالفعل).

_آخر مراجعة فعلية للحالة دي (مقابل الكود + اللايف + الـtest suite): 2026-09-06._

## نظرة عامة

منصة تعلم تفاعلية متعددة اللغات: المستخدم يختار من بين 9 مواضيع تقنية، وكل موضوع فيه أدوات تفاعلية + اختبارات فهم + شهادة إتمام + مساعد AI. فيه فيتشر كورسات جديد (Supabase-backed) لسه شغال عليه.

## Design System (مؤكد من src/styles.css)

- الستايل: Dark neon cyber.
- الألوان: خلفية `#0a0a0f`، أخضر نيون `#00ff9d`، بنفسجي `#7c3aed`، أبيض ناعم `#f5f5f7`.
- الخطوط: Space Grotesk للعناوين، Inter للنصوص (+ Cairo fallback للعربي)، JetBrains Mono للأكواد.
- Dark/Light theme toggle، mobile-first (390px viewport).

## الـ Stack

TanStack Start + React 19 + Vite، Supabase (auth/Postgres/RLS)، Tailwind v4 + shadcn/ui، Vercel AI SDK + Gemini، jsPDF + qrcode (شهادات)، react-i18next، Vitest، ESLint/Prettier. الديبلوي على Cloudflare Worker (@cloudflare/vite-plugin + wrangler).

## الحالة الحالية

- **9 مواضيع** ثابتة فى `src/data/topics.ts`: Cybersecurity, AI, Software Engineering, Networking, Ethical Hacking, Data Science, Cloud Computing, Operating Systems, Professional Skills.
- **7 لغات**: en / ar (RTL) / es / fr / it / nl / tr - نصوص واجهة static فى `src/i18n/locales/*.ts`.
- **10 أدوات تفاعلية** فى صفحة tools تحت تصنيفين.
- **Quiz + شهادات** للمواضيع - `quiz_attempts` فى القاعدة، تصحيح server-side شغال بالفعل.
- **مساعد AI** (Gemini) context-aware للموضوع المفتوح.

## الكورسات (Supabase-backed)

**Introduction to Cybersecurity** (3 units، 6 lessons، 90 سؤال): `published: true` - شغال فعليًا.
**Beyond the Introduction to Cybersecurity** (16 units، 48 lessons، 455 سؤال - فاينل إكزام 50 عادي + 5 احتياطي للـretake): محمّل بالكامل، لسه `published: false` لحد المراجعة.

من الـ4 حاجات اللي كانت "مطلوبة قبل ما يبقى جاهز"، 3 خلصوا - وكمان فيتشر تاني كان متوقف عليهم خلص معاهم:

- ~~تصحيح الإجابات server-side~~ - خلص (`REVOKE` على `correct_choice_id` + `checkCourseAnswer`/`revealAnswer` فى `course-actions.ts`، بنفس منطق `quiz_attempts`)
- ~~جداول attempts + منطق إعادة الامتحان النهائي~~ - خلص (`course_exam_attempts` + عمود `is_reserve` + منطق الـswap فى `getFinalExam`)
- ~~صفحة/route لعرض الدرس~~ - خلص (`courses_.$courseSlug_.$lessonId.tsx`، مسجّل فى الراوتر)
- ~~داشبورد "Continue Learning" للكورسات الجارية~~ - خلص فعلًا: قسم كامل فى `dashboard.tsx` (progress bar، عنوان آخر درس، زرار Continue) بيستخدم `getInProgressCourses()`، والكتابة (`recordLessonProgress`) شغالة من `useEffect` فى صفحة الدرس. (تصحيح: قلت قبل كده إن ده مش متعمول - كان غلط مني، غلطة فى الـgrep بحثت بحرف كبير "Continue" فمفوتّش الـi18n keys اللي كلها بحروف صغيرة زي `continueButton`)

لسه فاضل:

1. **ترجمة المحتوى** للـ6 لغات التانية - لسه بس `en` فى القاعدة.
2. **صور الكورسات** (14 لكورس 1، 48 لكورس 2) - سكريبت الرفع (`scripts/upload-course-media.mjs`) جاهز وموجود بس لسه ما اتشغّلش؛ الـbucket على اللايف لسه فاضي تمامًا (0 files). **ده اللي هيسبب صور مكسورة فعليًا على دروس Course 1 المنشور دلوقتي.**

كمان اتضاف نظام شهادات للكورسات (مش بس للمواضيع): عمود `course_id` على `certificates`، ونص "اللي اتعلمته" بقى `learning_summary` مكتوب لكل كورس بدل ما يتجمع من عناوين الـunits.

## حاجات صغيرة لسه مفتوحة

- `profiles.display_name`: حد الـ50 حرف على الـfrontend بس، مفيش قيد فى القاعدة.
- `SUPPORT_EMAIL` فى `account.tsx` لسه placeholder (`support@myidea.example`).
- `partnerships-section.tsx` بيعرض 4 مربعات placeholder بدل شركاء حقيقيين (متعمد - السبب مكتوب فى الكود).

## ما لن يتم فى الخطة الحالية

- تسجيل مدفوعات.
- محرر دروس للأدمن.
- إشعارات push.
