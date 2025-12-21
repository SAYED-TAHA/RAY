# RAY Project Inventory (MVP)

> هدف هذا الملف: خريطة شاملة لكل **الأنشطة/الأنظمة (Systems)** مع صفحاتها (Customer / Dashboard / Admin) والمكونات المشتركة وخدمات الـ API، مع توضيح: **الموجود، الناقص، وأماكن البيانات الثابتة**.  
> ملاحظة: التركيز هنا **MVP** (تشغيل صحيح بدون تعقيد زائد) مع إزالة البيانات الثابتة من لوحات الإدارة قدر الإمكان وربطها بـ API تدريجيًا.

---

## 1) Definitions

- **Customer System Page**: صفحة تعريف/تسويق النظام داخل `src/app/systems/<system>/page.tsx`.
- **Dashboard Route**: صفحة دخول لوحة النظام داخل `src/app/dashboard/<system>/page.tsx`.
- **Dashboard Component**: لوحة النظام داخل `src/components/dashboard/systems/<system>/...`.
- **Shared Dashboard Components**: مكونات مشتركة داخل `src/components/dashboard/shared/*`.
- **API Services**: خدمات الاستدعاء داخل `src/services/*Service.ts`.

---

## 2) Global Entry Points

### 2.1 Systems Selector
- `src/app/systems/page.tsx`
  - يعرض `SystemsHubWorldwide` ثم `SystemActivitySelector`.

### 2.2 Dashboard Generic Entry
- `src/app/dashboard/page.tsx`
  - يقرأ `?type=<BusinessType>` ويعرض `src/components/Dashboard.tsx`.

### 2.3 Central Dashboard Router
- `src/components/Dashboard.tsx`
  - يحدد Dashboard Component بناءً على `currentBusinessType`.
  - **ملاحظة مهمة**: يوجد تعارض/تعدد مداخل للوحات:
    - بعض الأنظمة لديها Route خاص (`/dashboard/<system>`)
    - وبعضها تعتمد على `/dashboard?type=...`
    - وبعضها يشير إلى Dashboard مختلف (مثل clinic/gym/salon/nursery تستخدم `BookingsDashboard` في Route الخاص).

---

## 3) Systems (Activities) Matrix

### Legend
- **Status**
  - **OK**: موجود ومترابط بشكل مقبول للـ MVP
  - **PARTIAL**: موجود لكن يحتاج تنظيف/ربط API/تصحيح Route
  - **MISSING**: لا يوجد Dashboard Component أو Route

> ملاحظة: صفحات `src/app/systems/<system>/page.tsx` هي صفحات تسويقية وبها بيانات ثابتة (features/pricing). هذا مقبول مبدئيًا للـ MVP، لكن يمكن لاحقًا تحويلها لمصدر بيانات من backend إذا رغبت.

---

### 3.1 Core Systems موجودة في both systems + dashboard

#### restaurant
- **Customer Page**: `src/app/systems/restaurant/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/restaurant` -> `src/app/dashboard/restaurant/page.tsx` -> `RestaurantDashboard`
  - `/dashboard?type=restaurant` -> `src/components/Dashboard.tsx` -> `RestaurantDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/restaurants/RestaurantDashboard.tsx`
- **Tabs**:
  - overview, pos, orders, kitchen, tables, table_layout, delivery, menu, inventory, loyalty, reservations, reviews, settings
- **Status**: **PARTIAL**
- **Static Data Hotspots (suspected/known)**:
  - بعض مكونات المطعم بها بيانات ثابتة أو placeholders (مثل TableLayoutEditor وغيرها)
- **API Services to use**:
  - `ordersService`, `analyticsService`, `productsService`, `offersService`

#### retail
- **Customer Page**: `src/app/systems/retail/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/retail` -> `src/app/dashboard/retail/page.tsx` -> `RetailDashboard`
  - `/dashboard?type=retail` -> `src/components/Dashboard.tsx` -> `RetailDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/retail/RetailDashboard.tsx`
- **Tabs**:
  - overview, pos, products/inventory, suppliers, customers, reports, marketing/offers, loyalty, messages, reviews, settings
- **Status**: **PARTIAL**
- **Notes**:
  - `UnifiedPOS` كبير ويحتمل بيانات ثابتة داخله.
  - `RetailOverview` بالفعل يستخدم `fetchDashboardOverview()` (جيد).
- **API Services to use**:
  - `ordersService`, `analyticsService`, `productsService`, `offersService`, `usersService`

#### pharmacy
- **Customer Page**: `src/app/systems/pharmacy/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/pharmacy` -> `src/app/dashboard/pharmacy/page.tsx` -> `PharmacyDashboard`
  - `/dashboard?type=pharmacy` -> `src/components/Dashboard.tsx` -> `PharmacyDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/pharmacy/PharmacyDashboard.tsx`
- **Status**: **PARTIAL**
- **API Services to use**:
  - `ordersService`, `analyticsService`, `productsService`

#### realestate
- **Customer Page**: `src/app/systems/realestate/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/realestate` -> `src/app/dashboard/realestate/page.tsx` -> `RealEstateDashboard`
  - `/dashboard?type=realestate` -> `src/components/Dashboard.tsx` -> `RealEstateDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/realestate/RealEstateDashboard.tsx`
- **Status**: **PARTIAL**
- **Static Data Hotspots (suspected/known)**:
  - LeadsKanban / LeadsManager / PropertiesManager قد تحتوي arrays ثابتة.
- **API Services to use**:
  - (لا يوجد service مخصص للعقارات بعد) مبدئيًا: `systemService` + إضافة service مستقبلًا.

#### cars
- **Customer Page**: `src/app/systems/cars/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/cars` -> `src/app/dashboard/cars/page.tsx` -> `CarsDashboard`
  - `/dashboard?type=cars` -> `src/components/Dashboard.tsx` -> `CarsDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/cars/CarsDashboard.tsx`
- **Tabs**:
  - overview, inventory, inspection, test_drives, sales, installments, maintenance, insurance
- **Status**: **PARTIAL**
- **API Services to use**:
  - `productsService`, `ordersService`, `analyticsService`

#### carwash
- **Customer Page**: `src/app/systems/carwash/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/carwash` -> `src/app/dashboard/carwash/page.tsx` -> `CarWashDashboard`
  - `/dashboard?type=carwash` -> `src/components/Dashboard.tsx` -> `CarWashDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/carwash/CarWashDashboard.tsx`
- **Status**: **PARTIAL**

#### services
- **Customer Page**: `src/app/systems/services/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/services` -> `src/app/dashboard/services/page.tsx` -> `ServicesDashboard`
  - `/dashboard?type=services` -> `src/components/Dashboard.tsx` -> `ServicesDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/services/ServicesDashboard.tsx`
- **Status**: **PARTIAL**

#### laundry
- **Customer Page**: `src/app/systems/laundry/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/laundry` -> `src/app/dashboard/laundry/page.tsx` -> `LaundryDashboard`
  - `/dashboard?type=laundry` -> `src/components/Dashboard.tsx` -> `LaundryDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/laundry/LaundryDashboard.tsx`
- **Tabs**:
  - overview, received, processing, ironing, ready, delivery, subscriptions, settings
- **Status**: **PARTIAL**

#### clothing
- **Customer Page**: `src/app/systems/clothing/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/clothing` -> `src/app/dashboard/clothing/page.tsx` -> `ClothingDashboard`
  - `/dashboard?type=clothing` -> `src/components/Dashboard.tsx` -> `ClothingDashboard`
- **Dashboard Component**: `src/components/dashboard/systems/clothing/ClothingDashboard.tsx`
- **Status**: **PARTIAL**

---

### 3.2 Booking-based Systems (Routes تستخدم BookingsDashboard)

> هذه الأنظمة لديها Dashboard Component خاص في `src/components/dashboard/systems/<system>/...` لكن Routes داخل `src/app/dashboard/<system>/page.tsx` تقوم بتوجيهها إلى `BookingsDashboard`.

#### clinic
- **Customer Page**: `src/app/systems/clinic/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/clinic` -> `src/app/dashboard/clinic/page.tsx` -> **redirect** to `/dashboard?type=clinic`
  - `/dashboard?type=clinic` -> `src/components/Dashboard.tsx` -> **ClinicDashboard**
- **Dashboard Components**:
  - `src/components/dashboard/systems/clinic/ClinicDashboard.tsx` (موجود)
  - `src/components/dashboard/systems/bookings/BookingsDashboard.tsx` (مستخدم في route)
- **Status**: **PARTIAL**
- **Work Done**:
  - `ClinicOverview` تم تنظيفه وربطه بـ `analyticsService.fetchDashboardOverview()`.
- **Missing/Notes**:
  - `finance` داخل `ClinicDashboard` مجرد placeholder.

#### gym
- **Customer Page**: `src/app/systems/gym/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/gym` -> `src/app/dashboard/gym/page.tsx` -> **redirect** to `/dashboard?type=gym`
  - `/dashboard?type=gym` -> `src/components/Dashboard.tsx` -> `GymDashboard`
- **Status**: **PARTIAL**

#### salon
- **Customer Page**: `src/app/systems/salon/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/salon` -> `src/app/dashboard/salon/page.tsx` -> **redirect** to `/dashboard?type=salon`
  - `/dashboard?type=salon` -> `src/components/Dashboard.tsx` -> `BookingsDashboard`
- **Status**: **PARTIAL**

#### nursery
- **Customer Page**: `src/app/systems/nursery/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/nursery` -> `src/app/dashboard/nursery/page.tsx` -> **redirect** to `/dashboard?type=nursery`
  - `/dashboard?type=nursery` -> `src/components/Dashboard.tsx` -> `BookingsDashboard`
- **Status**: **PARTIAL**

#### bookings
- **Customer Page**: `src/app/systems/bookings/page.tsx`
- **Dashboard Routes**:
  - `/dashboard/bookings?type=<clinic|gym|salon|nursery|...>` -> `BookingsDashboard(type=...)`
- **Status**: **OK (as shared booking engine)**

---

### 3.3 Systems موجودة في Customer pages لكن بدون Dashboard Implementation كاملة

#### supermarket
- **Customer Page**: `src/app/systems/supermarket/page.tsx`
- **Dashboard Route**: **MISSING** (`src/app/dashboard/supermarket` غير موجود)
- **Dashboard Components**: **MISSING** (`src/components/dashboard/systems/supermarket` empty)
- **Status**: **MISSING**
- **MVP Suggestion**:
  - في المرحلة الأولى: إعادة استخدام `RetailDashboard` مع `type="supermarket"`.

#### supplier
- **Customer Page**: `src/app/systems/supplier/page.tsx`
- **Entry Points (Portal خارج /dashboard)**:
  - **Supplier Marketplace (customers/merchants)**: `src/app/suppliers/page.tsx`
  - **Supplier Register**: `src/app/suppliers/register/page.tsx`
  - **Supplier Public Detail**: `src/app/suppliers/[id]/page.tsx`
  - **Supplier Dashboard**: `/supplier/dashboard` -> `src/app/supplier/dashboard/page.tsx`
- **Data Status**:
  - `src/app/suppliers/page.tsx`: بيانات الموردين **ثابتة** (array داخل الصفحة)
  - `src/app/suppliers/[id]/page.tsx`: بيانات المورد **ثابتة** + إنشاء طلب يحفظ في `localStorage` key: `supplierOrders`
  - `src/app/supplier/dashboard/page.tsx`: بيانات منتجات/إحصائيات/رسائل **ثابتة** + تحميل الطلبات من `localStorage` key: `supplierOrders`
- **API Services**:
  - لا يوجد service مخصص للموردين حتى الآن (مطلوب لاحقًا: `suppliersService` + endpoints backend)
- **Status**: **PARTIAL (Standalone portal, mostly static/localStorage)**

#### law / consulting / resort
- **Customer Pages**:
  - `src/app/systems/law/page.tsx`
  - `src/app/systems/consulting/page.tsx`
  - `src/app/systems/resort/page.tsx`
- **Dashboard Routes**: **MISSING** داخل `src/app/dashboard/*`
- **Dashboard Components**: **MISSING** داخل `src/components/dashboard/systems/*`
- **Status**: **MISSING**

---

## 4) Shared Dashboard Modules

### 4.1 Shared Config
- `src/components/dashboard/shared/config.ts`
  - يحتوي تعريفات `dashboardConfigsRaw` مع `stats` و `data` ثابتة.
  - **مهم**: يتم تصفير `stats` و `data` عبر `sanitizeDashboardConfigs`.
  - **MVP Decision**: إبقاء config كـ UI/navigation source فقط (navItems/quickActions/tableHeaders) وعدم الاعتماد على `data` الثابتة.

### 4.2 Shared Views
- `src/components/dashboard/shared/views/Overview.tsx`
  - يستخدم API: `fetchDashboardOverview` + `fetchSalesReport`.
- `CalendarView.tsx` (يحتمل بيانات ثابتة/placeholder داخليًا)
- `InventoryView.tsx`
- `POSView.tsx`
- `SettingsView.tsx`, `NotificationsView.tsx`, `ProfileView.tsx`, ...

### 4.3 Shared Layout
- `src/components/dashboard/shared/layout/Header.tsx`
- `src/components/dashboard/shared/layout/Sidebar.tsx`
- `src/components/dashboard/shared/layout/MobileSidebar.tsx`
- `src/components/dashboard/shared/layout/CommandPalette.tsx`

### 4.4 Shared Widgets
- `StatsGrid`, `QuickActions`, `RecentActivityTable`, ...

---

## 5) Admin Area (Backoffice)

### Routes
- `src/app/admin/*`
  - صفحات كثيرة (analytics, orders, payments, users, systems, ...)

### Admin Layout Wrapper
- `src/app/admin/layout.tsx`

### Admin Systems Page
- `src/app/admin/systems/page.tsx`
  - يعرض كل الأنظمة كبطاقات مع ربط إلى `/dashboard?type=<id>`.

### Admin API Services موجودة
- `src/services/admin*Service.ts`

---

## 6) API Services Inventory (frontend/src/services)

- `analyticsService.ts` (dashboard overview + analytics + sales report)
- `ordersService.ts` (orders CRUD + filters)
- `productsService.ts` / `productService.ts` (products)
- `offersService.ts` (offers)
- `usersService.ts` (users)
- `systemService.ts` (health/logs/stats)
- `auditService.ts` (audit/security)
- `paymentService.ts` (payments)
- `subscriptionService.ts` / `adminSubscriptionsService.ts`
- `adminSettingsService.ts` + admin* services
- `localDataStore.ts` (local demo mode)

---

## 7) Current Work Log

- **Fixed**: `useTheme` runtime crash by returning fallback values when ThemeProvider is missing.
- **Updated**: `ClinicOverview` migrated from unsupported axios endpoints + removed hardcoded UI data; now uses `analyticsService.fetchDashboardOverview()`.

---

## 8) Next MVP Actions (Step-by-Step)

1) **Lock Inventory**: بعد مراجعتك لهذا الملف، نثبت أي أسماء أنظمة إضافية لازم تظهر في `/admin/systems` و `/systems`.
2) **Resolve Route Mismatches**:
   - decide: هل `/dashboard/<system>` يجب أن يفتح dashboard الخاص بالنظام أم `BookingsDashboard`؟
3) **Pick ONE system** (مثال: restaurant أو retail) وتحويل كل مكوناته من البيانات الثابتة إلى services.
4) إنشاء Services مفقودة للأنظمة الجديدة (law/consulting/resort/supermarket) أو إعادة استخدام داشبورد موجود.
