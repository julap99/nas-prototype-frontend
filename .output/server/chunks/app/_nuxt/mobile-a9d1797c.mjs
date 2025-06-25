import { a as _export_sfc, _ as __nuxt_component_1$1 } from '../server.mjs';
import { ref, watch, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'destr';
import 'klona';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue3-perfect-scrollbar';
import '@floating-ui/utils';
import '@formkit/core';
import '@formkit/utils';
import '@formkit/inputs';
import '@formkit/rules';
import '@formkit/validation';
import '@formkit/i18n';
import '@formkit/themes';
import '@formkit/observer';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'vue3-dropzone';
import '@formkit/addons';
import 'cookie-es';
import 'ohash';
import 'pinia-plugin-persistedstate';
import '@formkit/auto-animate/vue';
import 'maska';
import 'swiper/vue';
import '@shimyshack/uid';
import 'v-calendar';
import 'vue-code-highlight';
import 'codemirror';
import '@codemirror/state';
import '@codemirror/view';
import '@codemirror/commands';
import '@codemirror/language';
import 'vue-country-flag-next';
import 'sweetalert2';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'memory-cache';
import 'perf_hooks';
import 'xss';
import 'http-graceful-shutdown';

const _sfc_main = {
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const exampleData = ref({
      headerTitle: "Dashboard Zakat",
      profileExpanded: false,
      showNotifications: false,
      currentSection: "dashboard",
      previousSection: null,
      showBackButton: false,
      subSection: null,
      // Data untuk metrik utama dashboard
      keyMetrics: [
        {
          title: "Jumlah Agihan Zakat",
          value: "RM 284.5 J",
          icon: "ic:baseline-volunteer-activism",
          change: "positive",
          description: "+18.3% berbanding tahun lepas"
        },
        {
          title: "Jumlah Penerima",
          value: "412,674",
          icon: "ic:baseline-people",
          change: "positive",
          description: "+12.4% berbanding tahun lepas"
        },
        {
          title: "Kadar Pengagihan",
          value: "92.4%",
          icon: "ic:baseline-donut-large",
          change: "positive",
          description: "+3.2% berbanding sasaran"
        },
        {
          title: "Permohonan Diluluskan",
          value: "38,245",
          icon: "ic:baseline-fact-check",
          change: "neutral",
          description: "+5.8% berbanding suku tahun"
        }
      ],
      // Data untuk kategori agihan zakat mengikut asnaf
      asnafDistribution: [
        { category: "Fakir", percentage: 28.5, amount: 81.1 },
        { category: "Miskin", percentage: 32.7, amount: 93.1 },
        { category: "Amil", percentage: 12.5, amount: 35.6 },
        { category: "Muallaf", percentage: 5.8, amount: 16.5 },
        { category: "Gharimin", percentage: 6.2, amount: 17.6 },
        { category: "Fisabilillah", percentage: 10.2, amount: 29 },
        { category: "Ibnu Sabil", percentage: 2.4, amount: 6.8 },
        { category: "Riqab", percentage: 1.7, amount: 4.8 }
      ],
      // Data agihan bulanan
      monthlyDistribution: [
        {
          name: "Agihan 2023",
          data: [18.5, 19.2, 22.4, 24.8, 26.5, 28.2, 29.4, 31.6, 28.8, 25.4, 16.2, 13.5]
        },
        {
          name: "Agihan 2022",
          data: [15.8, 16.4, 19.2, 20.6, 21.8, 23.5, 24.8, 26.3, 24.5, 22.1, 14.6, 11.8]
        }
      ],
      // Data program agihan zakat
      zakatPrograms: [
        { program: "Bantuan Pendidikan", beneficiaries: 98450, amount: 62.8, disbursed: 93.5 },
        { program: "Bantuan Kesihatan", beneficiaries: 74280, amount: 48.5, disbursed: 87.2 },
        { program: "Bantuan Sara Hidup", beneficiaries: 85640, amount: 52.4, disbursed: 95.8 },
        { program: "Bantuan Perumahan", beneficiaries: 28450, amount: 36.2, disbursed: 82.4 }
      ],
      // Data prestasi KPI
      kpiData: [
        { metric: "Kadar Pengagihan Dana Zakat", actual: 92.4, target: 85, status: "Cemerlang" },
        { metric: "Masa Pemprosesan Permohonan", actual: 12, target: 14, status: "Cemerlang" },
        { metric: "Kepuasan Asnaf", actual: 94.2, target: 90, status: "Cemerlang" }
      ],
      demoPages: [
        {
          id: "dashboard",
          title: "Utama",
          icon: "ic:outline-home"
        },
        {
          id: "permohonan",
          title: "Permohonan",
          icon: "ic:outline-article"
        },
        {
          id: "bantuan",
          title: "Bantuan",
          icon: "ic:outline-volunteer-activism"
        },
        {
          id: "notifikasi",
          title: "Notifikasi",
          icon: "ic:outline-notifications"
        },
        {
          id: "profile",
          title: "Profil",
          icon: "ic:outline-person"
        }
      ],
      permohonanTabs: [
        { id: "active", title: "Aktif" },
        { id: "draft", title: "Draf" },
        { id: "history", title: "Sejarah" }
      ],
      activeTab: "active",
      showMenu: false,
      searchQuery: "",
      showEmptyState: false,
      isLoading: false,
      showFabMenu: false,
      // User profile data
      userProfile: {
        name: "Muhammad bin Daud",
        id: "860215-14-5732",
        email: "muhammad.daud@example.com",
        phone: "019-8765432",
        address: "No. 45, Jalan Gemilang, Taman Bahagia, 40100 Shah Alam, Selangor",
        position: "Penerima Bantuan",
        department: "Asnaf Fakir",
        joinDate: "10 Jan 2018",
        avatar: "M",
        actions: [
          { name: "Tetapan Akaun", icon: "ic:baseline-settings", action: "settings" },
          { name: "Bantuan", icon: "ic:baseline-help-outline", action: "help" },
          { name: "Log Aktiviti", icon: "ic:baseline-history", action: "activity" }
        ]
      },
      // Dashboard data
      dashboardData: {
        totalBantuan: "RM 3,450",
        nextPayment: "15 Jun 2023",
        bantuanBulan: "RM 700",
        totalPendidikan: "RM 200",
        announcements: [
          {
            id: 1,
            title: "Program Bantuan Sekolah 2023",
            content: "Permohonan bantuan persekolahan untuk anak-anak asnaf kini dibuka sehingga 30 Jun 2023.",
            date: "10 Jun 2023",
            image: "school-aid.jpg"
          },
          {
            id: 2,
            title: "Kursus Kemahiran Digital",
            content: "Kursus percuma untuk asnaf yang berminat dalam kemahiran digital. Tempat terhad!",
            date: "08 Jun 2023",
            image: "digital-course.jpg"
          }
        ],
        upcomingEvents: [
          {
            id: 1,
            title: "Agihan Bantuan Ramadan",
            date: "20 Jun 2023",
            time: "9:00 pagi",
            location: "Kompleks Zakat Selangor"
          },
          {
            id: 2,
            title: "Sesi Kaunseling Kewangan",
            date: "25 Jun 2023",
            time: "10:00 pagi",
            location: "Pusat Komuniti Petaling Jaya"
          }
        ]
      },
      // Permohonan (application) data
      permohonanData: {
        activeApplications: [
          {
            id: "APP-2023-1234",
            pemohon: "Ahmad bin Hassan",
            noIC: "901122-14-5523",
            alamat: "No. 12, Jalan Maju, 40000 Shah Alam",
            telefon: "019-1234567",
            type: "Bantuan Pendidikan",
            amount: "RM 2,500",
            submissionDate: "12 Mei 2023",
            status: "DALAM PROSES"
          },
          {
            id: "APP-2023-2345",
            pemohon: "Siti Aminah",
            noIC: "891215-14-5123",
            alamat: "No. 45, Jalan Berjaya, 40100 Shah Alam",
            telefon: "012-3456789",
            type: "Bantuan Sara Hidup",
            amount: "RM 1,200",
            submissionDate: "18 Mei 2023",
            status: "DALAM PROSES"
          },
          {
            id: "APP-2023-3456",
            pemohon: "Kamal bin Johari",
            noIC: "850430-14-7851",
            alamat: "No. 78, Jalan Harmoni, 40200 Shah Alam",
            telefon: "017-9876543",
            type: "Bantuan Perniagaan",
            amount: "RM 5,000",
            submissionDate: "25 Mei 2023",
            status: "MENUNGGU"
          }
        ],
        draftApplications: [
          {
            id: "DRAFT-2023-5678",
            pemohon: "Zahir bin Omar",
            noIC: "880517-14-5123",
            type: "Bantuan Pendidikan",
            lastUpdated: "15 Mei 2023"
          }
        ],
        historicalApplications: [
          {
            id: "APP-2022-9012",
            pemohon: "Farid bin Razali",
            noIC: "790222-14-5123",
            type: "Bantuan Perniagaan",
            amount: "RM 7,500",
            submissionDate: "10 Jan 2023",
            status: "LULUS"
          },
          {
            id: "APP-2022-3456",
            pemohon: "Noraini binti Aziz",
            noIC: "881115-14-5553",
            type: "Bantuan Perubatan",
            amount: "RM 3,200",
            submissionDate: "15 Mar 2023",
            status: "DITOLAK",
            reason: "Dokumen tidak lengkap"
          },
          {
            id: "APP-2022-7890",
            pemohon: "Zulkifli bin Hasan",
            noIC: "751020-14-7123",
            type: "Bantuan Pendidikan",
            amount: "RM 1,800",
            submissionDate: "22 Feb 2023",
            status: "LULUS"
          }
        ],
        applicationTypes: [
          { id: "BSH", name: "Bantuan Sara Hidup" },
          { id: "PEND", name: "Bantuan Pendidikan" },
          { id: "PERU", name: "Bantuan Perubatan" },
          { id: "PERNI", name: "Bantuan Perniagaan" },
          { id: "RURUN", name: "Bantuan Rumah" }
        ]
      },
      // Bantuan Saya (My Aid) data
      bantuanData: {
        activeBantuan: [
          {
            id: "BAN-2023-1234",
            type: "Bantuan Sara Hidup",
            amount: "RM 500/bulan",
            startDate: "Jan 2023",
            endDate: "Dis 2023",
            nextPayment: "15 Jun 2023"
          },
          {
            id: "BAN-2023-5678",
            type: "Bantuan Pendidikan Anak",
            amount: "RM 200/bulan",
            startDate: "Feb 2023",
            endDate: "Nov 2023",
            nextPayment: "15 Jun 2023"
          }
        ],
        paymentHistory: [
          { id: "PMT-0012", date: "15 Mei 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai" },
          { id: "PMT-0011", date: "15 Apr 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai" },
          { id: "PMT-0010", date: "15 Mac 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai" }
        ],
        timeline: [
          { step: "Permohonan Dihantar", date: "10/05/2023", time: "09:30", completed: true },
          { step: "Verifikasi Dokumen", date: "11/05/2023", time: "14:45", completed: true },
          { step: "Semakan Pegawai", date: "12/05/2023", time: "11:20", completed: true },
          { step: "Kelulusan", date: "20/05/2023", time: "10:15", completed: true },
          { step: "Agihan Bantuan", date: "01/06/2023", time: "09:00", completed: true }
        ]
      },
      // Notification data
      notificationData: {
        unread: 3,
        items: [
          { id: 1, title: "Pembayaran Bantuan", content: "Bantuan bulanan sebanyak RM 700 telah dikreditkan ke akaun anda", time: "2 jam lalu", unread: true, type: "success" },
          { id: 2, title: "Dokumen Tambahan Diperlukan", content: "Sila kemukakan salinan surat pengesahan pendapatan untuk permohonan #APP-2023-1234", time: "5 jam lalu", unread: true, type: "warning" },
          { id: 3, title: "Peringatan Temuduga", content: "Temuduga untuk permohonan bantuan akan diadakan pada 18 Jun 2023, 10:00 pagi", time: "1 hari lalu", unread: true, type: "info" },
          { id: 4, title: "Program Asnaf", content: "Program Latihan Kemahiran untuk Asnaf akan bermula pada 20 Jun 2023", time: "2 hari lalu", unread: false, type: "info" },
          { id: 5, title: "Status Permohonan", content: "Permohonan #APP-2022-3456 telah ditolak. Sila semak maklumat lanjut dalam sistem.", time: "3 hari lalu", unread: false, type: "error" }
        ]
      },
      // Form data for application
      newApplicationForm: {
        type: "",
        fullName: "",
        idNumber: "",
        phone: "",
        email: "",
        address: "",
        reason: "",
        dependents: 0,
        monthlyIncome: "",
        documents: []
      },
      formErrors: {
        type: false,
        fullName: false,
        idNumber: false,
        phone: false,
        email: false,
        monthlyIncome: false
      },
      // Form validation states
      formIsValid: false,
      formSubmitted: false,
      formSubmitting: false,
      // Active detail views
      activeApplicationDetail: null,
      activeBantuanDetail: null,
      editApplicationId: null
    });
    const animationStates = ref({
      menuExpanded: false,
      profileExpanded: false,
      fabExpanded: false,
      pageTransition: false
    });
    const updatePageTitle = () => {
      const currentSection = exampleData.value.currentSection;
      const page = exampleData.value.demoPages.find((p) => p.id === currentSection);
      if (exampleData.value.subSection) {
        switch (exampleData.value.subSection) {
          case "new":
            exampleData.value.headerTitle = "Permohonan Baru";
            break;
          case "details":
            exampleData.value.headerTitle = "Butiran";
            break;
          default:
            exampleData.value.headerTitle = (page == null ? void 0 : page.title) || "Portal Asnaf";
        }
      } else {
        exampleData.value.headerTitle = (page == null ? void 0 : page.title) || "Portal Asnaf";
      }
    };
    watch(() => [exampleData.value.currentSection, exampleData.value.subSection], () => {
      updatePageTitle();
      animationStates.value.pageTransition = true;
      setTimeout(() => {
        animationStates.value.pageTransition = false;
      }, 300);
    });
    exampleData.value.bantuanData = {
      activeBantuan: [
        {
          id: "BAN-2023-1234",
          type: "Bantuan Sara Hidup",
          category: "Fakir",
          amount: "RM 500/bulan",
          startDate: "Jan 2023",
          endDate: "Dis 2023",
          nextPayment: "15 Jun 2023",
          referenceNo: "BSH-23/1234",
          status: "AKTIF",
          details: {
            approvedBy: "Pegawai Zakat Daerah Shah Alam",
            approvalDate: "15 Dis 2022",
            disbursementMethod: "Akaun Bank",
            bankName: "Bank Islam",
            accountNo: "xxxx-xxx-xxxxx",
            totalAmountApproved: "RM 6,000 (RM 500 \xD7 12 bulan)",
            totalDisbursed: "RM 2,500 (5 bulan)",
            remainingAmount: "RM 3,500 (7 bulan)"
          }
        },
        {
          id: "BAN-2023-5678",
          type: "Bantuan Pendidikan Anak",
          category: "Miskin",
          amount: "RM 200/bulan",
          startDate: "Feb 2023",
          endDate: "Nov 2023",
          nextPayment: "15 Jun 2023",
          referenceNo: "BPA-23/5678",
          status: "AKTIF",
          details: {
            approvedBy: "Pegawai Zakat Daerah Shah Alam",
            approvalDate: "20 Jan 2023",
            disbursementMethod: "Akaun Bank",
            bankName: "Bank Islam",
            accountNo: "xxxx-xxx-xxxxx",
            totalAmountApproved: "RM 2,000 (RM 200 \xD7 10 bulan)",
            totalDisbursed: "RM 800 (4 bulan)",
            remainingAmount: "RM 1,200 (6 bulan)",
            children: [
              { name: "Ahmad bin Muhammad", age: 12, school: "SK Taman Sri Muda", level: "Darjah 6" },
              { name: "Nur Aisyah binti Muhammad", age: 15, school: "SMK Taman Sri Muda", level: "Tingkatan 3" }
            ]
          }
        },
        {
          id: "BAN-2023-9012",
          type: "Bantuan Perubatan",
          category: "Fakir",
          amount: "RM 350/bulan",
          startDate: "Apr 2023",
          endDate: "Apr 2024",
          nextPayment: "15 Jun 2023",
          referenceNo: "BPR-23/9012",
          status: "AKTIF",
          details: {
            approvedBy: "Pegawai Zakat Daerah Shah Alam",
            approvalDate: "25 Mar 2023",
            disbursementMethod: "Akaun Bank",
            bankName: "Bank Islam",
            accountNo: "xxxx-xxx-xxxxx",
            totalAmountApproved: "RM 4,200 (RM 350 \xD7 12 bulan)",
            totalDisbursed: "RM 700 (2 bulan)",
            remainingAmount: "RM 3,500 (10 bulan)",
            medicalCondition: "Diabetes & Tekanan Darah Tinggi",
            medicalFacility: "Klinik Kesihatan Seksyen 7"
          }
        }
      ],
      paymentHistory: [
        { id: "PMT-0012", date: "15 Mei 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai", details: "Bantuan Sara Hidup (RM 500) & Pendidikan (RM 200)" },
        { id: "PMT-0011", date: "15 Apr 2023", amount: "RM 1,050", type: "Bantuan Bulanan", status: "Selesai", details: "Bantuan Sara Hidup (RM 500), Pendidikan (RM 200) & Perubatan (RM 350)" },
        { id: "PMT-0010", date: "15 Mac 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai", details: "Bantuan Sara Hidup (RM 500) & Pendidikan (RM 200)" },
        { id: "PMT-0009", date: "15 Feb 2023", amount: "RM 700", type: "Bantuan Bulanan", status: "Selesai", details: "Bantuan Sara Hidup (RM 500) & Pendidikan (RM 200)" },
        { id: "PMT-0008", date: "15 Jan 2023", amount: "RM 500", type: "Bantuan Bulanan", status: "Selesai", details: "Bantuan Sara Hidup (RM 500)" }
      ],
      timeline: [
        { step: "Permohonan Dihantar", date: "10/05/2023", time: "09:30", completed: true },
        { step: "Verifikasi Dokumen", date: "11/05/2023", time: "14:45", completed: true },
        { step: "Semakan Pegawai", date: "12/05/2023", time: "11:20", completed: true },
        { step: "Kelulusan", date: "20/05/2023", time: "10:15", completed: true },
        { step: "Agihan Bantuan", date: "01/06/2023", time: "09:00", completed: true }
      ],
      bantuanCategories: [
        { id: "BSH", name: "Bantuan Sara Hidup", description: "Bantuan kewangan bulanan untuk memenuhi keperluan asas", eligibility: "Asnaf fakir, miskin" },
        { id: "BPD", name: "Bantuan Pendidikan", description: "Bantuan untuk yuran dan keperluan sekolah", eligibility: "Asnaf fakir, miskin dengan anak bersekolah" },
        { id: "BPR", name: "Bantuan Perubatan", description: "Bantuan untuk rawatan dan ubat-ubatan", eligibility: "Asnaf fakir, miskin yang sakit kronik" },
        { id: "BPK", name: "Bantuan Perniagaan Kecil", description: "Modal untuk memulakan perniagaan kecil", eligibility: "Asnaf fakir, miskin yang berkelayakan" },
        { id: "BRM", name: "Bantuan Rumah", description: "Bantuan untuk sewaan atau baik pulih rumah", eligibility: "Asnaf fakir, miskin tanpa rumah tetap" }
      ],
      nearbyFacilities: [
        { name: "Pejabat Zakat Daerah Shah Alam", type: "Pejabat Zakat", distance: "2.5 KM", address: "Kompleks PKNS, Seksyen 14, 40000 Shah Alam", phone: "03-1234 5678" },
        { name: "Pusat Agihan Zakat Seksyen 7", type: "Pusat Agihan", distance: "1.8 KM", address: "Jalan Plumbum 7/101B, Seksyen 7, 40000 Shah Alam", phone: "03-2345 6789" },
        { name: "Klinik Kesihatan Seksyen 7", type: "Klinik Kesihatan", distance: "2.0 KM", address: "Jalan Plumbum 7/102, Seksyen 7, 40000 Shah Alam", phone: "03-3456 7890" }
      ],
      notifications: [
        {
          id: 1,
          title: "Pengagihan Bantuan Jun 2023",
          content: "Bantuan bulanan anda berjumlah RM 700 akan dikreditkan pada 15 Jun 2023.",
          date: "08/06/2023"
        },
        {
          id: 2,
          title: "Peringatan Kemaskini Maklumat",
          content: "Sila kemaskini maklumat akaun bank anda sebelum 30 Jun 2023.",
          date: "05/06/2023"
        }
      ],
      bantuanForm: {
        type: "",
        fullName: "",
        idNumber: "",
        category: "",
        address: "",
        phone: "",
        email: "",
        bankName: "",
        accountNumber: "",
        reason: "",
        documents: []
      }
    };
    exampleData.value.notificationData.items = [
      {
        id: 1,
        title: "Pembayaran Bantuan",
        content: "Bantuan bulanan sebanyak RM 700 telah dikreditkan ke akaun anda",
        time: "2 jam lalu",
        unread: true,
        type: "success",
        action: "view_bantuan",
        actionText: "Lihat Detail"
      },
      {
        id: 2,
        title: "Dokumen Tambahan Diperlukan",
        content: "Sila kemukakan salinan surat pengesahan pendapatan untuk permohonan #APP-2023-1234",
        time: "5 jam lalu",
        unread: true,
        type: "warning",
        action: "view_permohonan",
        permohonanId: "APP-2023-1234",
        actionText: "Kemaskini"
      },
      {
        id: 3,
        title: "Program Kemahiran Digital",
        content: "Tempat masih dibuka untuk Program Kemahiran Digital pada 25 Jun 2023, 10:00 pagi",
        time: "1 hari lalu",
        unread: true,
        type: "info",
        action: "rsvp_program",
        actionText: "Daftar"
      },
      {
        id: 4,
        title: "Program Asnaf",
        content: "Program Latihan Kemahiran untuk Asnaf akan bermula pada 20 Jun 2023",
        time: "2 hari lalu",
        unread: false,
        type: "info"
      },
      {
        id: 5,
        title: "Status Permohonan",
        content: "Permohonan #APP-2022-3456 telah ditolak. Sila semak maklumat lanjut dalam sistem.",
        time: "3 hari lalu",
        unread: false,
        type: "error"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<!--[--><div data-v-f963ee00><div class="wrapper" data-v-f963ee00><div class="phone-container" data-v-f963ee00><div class="mobile-frame" data-v-f963ee00><div class="h-5 bg-black flex items-center justify-between px-5" data-v-f963ee00><span class="text-white text-xs" data-v-f963ee00>12:45</span><div class="flex space-x-1" data-v-f963ee00>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-signal-cellular-alt",
        class: "text-white",
        size: "14"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-wifi",
        class: "text-white",
        size: "14"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-battery-full",
        class: "text-white",
        size: "14"
      }, null, _parent));
      _push(`</div></div><div class="mobile-content overflow-hidden" data-v-f963ee00><div class="mobile-header bg-primary shadow-md" data-v-f963ee00><div class="flex items-center justify-between px-4 py-3" data-v-f963ee00><div class="flex items-center" data-v-f963ee00><button class="mr-3 text-header-text" data-v-f963ee00>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-menu",
        size: "24"
      }, null, _parent));
      _push(`</button><h1 class="text-header-text font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).headerTitle)}</h1></div><div class="flex items-center space-x-4" data-v-f963ee00><button class="relative text-header-text" data-v-f963ee00>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-notifications",
        size: "24"
      }, null, _parent));
      if (unref(exampleData).notificationData.unread > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-primary text-[8px] font-bold flex items-center justify-center" data-v-f963ee00>${ssrInterpolate(unref(exampleData).notificationData.unread)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="text-header-text w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.avatar)}</button></div></div>`);
      if (unref(exampleData).showNotifications) {
        _push(`<div class="absolute top-12 right-0 w-full max-w-xs bg-white z-20 rounded-b-lg shadow-lg transition-all border border-t-0 border-gray-100 overflow-hidden" data-v-f963ee00><div class="p-3 border-b border-gray-100 flex justify-between items-center" data-v-f963ee00><h2 class="text-sm font-medium" data-v-f963ee00>Notifikasi <span class="text-xs ml-1" data-v-f963ee00>(${ssrInterpolate(unref(exampleData).notificationData.unread)} baru)</span></h2><button class="text-xs text-primary" data-v-f963ee00>Tandakan semua dibaca</button></div><div class="max-h-[400px] overflow-y-auto" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).notificationData.items, (notification) => {
          _push(`<div class="${ssrRenderClass([{ "bg-blue-50/30": notification.unread }, "p-3 border-b border-gray-100 last:border-0 relative hover:bg-gray-50"])}" data-v-f963ee00><div class="flex" data-v-f963ee00><div class="flex-shrink-0 mr-3" data-v-f963ee00><div class="${ssrRenderClass([{
            "bg-green-100 text-green-600": notification.type === "success",
            "bg-yellow-100 text-yellow-600": notification.type === "warning",
            "bg-blue-100 text-blue-600": notification.type === "info",
            "bg-red-100 text-red-600": notification.type === "error"
          }, "w-8 h-8 rounded-full flex items-center justify-center"])}" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: {
              "success": "ic:baseline-check-circle",
              "warning": "ic:baseline-warning",
              "info": "ic:baseline-info",
              "error": "ic:baseline-error"
            }[notification.type],
            size: "16"
          }, null, _parent));
          _push(`</div></div><div data-v-f963ee00><div class="flex items-start" data-v-f963ee00><p class="font-medium text-sm" data-v-f963ee00>${ssrInterpolate(notification.title)}</p>`);
          if (notification.unread) {
            _push(`<span class="ml-2 w-2 h-2 rounded-full bg-primary" data-v-f963ee00></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-xs text-gray-600 my-1" data-v-f963ee00>${ssrInterpolate(notification.content)}</p><p class="text-xs text-gray-400" data-v-f963ee00>${ssrInterpolate(notification.time)}</p></div></div></div>`);
        });
        _push(`<!--]--></div><div class="p-2 border-t border-gray-100 text-center" data-v-f963ee00><button class="text-sm text-primary font-medium" data-v-f963ee00>Lihat Semua Notifikasi</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).profileExpanded) {
        _push(`<div class="${ssrRenderClass([{ "expanded": unref(animationStates).profileExpanded }, "absolute top-12 right-0 w-full max-w-xs bg-white z-20 rounded-b-lg shadow-lg transition-all border border-t-0 border-gray-100 overflow-hidden"])}" data-v-f963ee00><div class="p-4 border-b border-gray-100" data-v-f963ee00><div class="flex items-center space-x-3 mb-3" data-v-f963ee00><div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.avatar)}</div><div class="flex-1" data-v-f963ee00><h3 class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.name)}</h3><p class="text-xs text-gray-500" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.email)}</p></div></div><div class="border border-gray-100 rounded-lg p-3 bg-gray-50 mb-3" data-v-f963ee00><div class="text-xs" data-v-f963ee00><div class="flex items-center mb-2" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-badge",
          size: "14",
          class: "text-primary mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600" data-v-f963ee00>No. ID:</span><span class="ml-1 font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.id)}</span></div><div class="flex items-center mb-2" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-phone",
          size: "14",
          class: "text-primary mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600" data-v-f963ee00>Telefon:</span><span class="ml-1 font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.phone)}</span></div><div class="flex items-start mb-2" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-home",
          size: "14",
          class: "text-primary mr-2 mt-0.5"
        }, null, _parent));
        _push(`<div data-v-f963ee00><span class="text-gray-600" data-v-f963ee00>Alamat:</span><div class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.address)}</div></div></div><div class="flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-category",
          size: "14",
          class: "text-primary mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600" data-v-f963ee00>Status:</span><span class="ml-1 font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.department)}</span></div></div></div><div class="mb-3 py-2 px-3 bg-secondary/10 rounded-lg border border-secondary/20 flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-verified-user",
          class: "text-secondary mr-2",
          size: "18"
        }, null, _parent));
        _push(`<div data-v-f963ee00><p class="text-xs font-medium text-gray-700" data-v-f963ee00>Status Asnaf:</p><p class="text-sm font-medium text-secondary" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.department)} <span class="text-xs" data-v-f963ee00>(sejak ${ssrInterpolate(unref(exampleData).userProfile.joinDate)})</span></p></div></div></div><div class="divide-y divide-gray-100" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).userProfile.actions, (action) => {
          _push(`<button class="flex items-center w-full p-3 hover:bg-gray-50 transition-colors" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: action.icon,
            size: "18",
            class: "text-gray-500 mr-3"
          }, null, _parent));
          _push(`<span class="text-sm" data-v-f963ee00>${ssrInterpolate(action.name)}</span></button>`);
        });
        _push(`<!--]--><button class="flex items-center w-full p-3 hover:bg-gray-50 transition-colors text-red-600" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-logout",
          size: "18",
          class: "mr-3"
        }, null, _parent));
        _push(`<span class="text-sm" data-v-f963ee00>Log Keluar</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative min-h-[calc(100%-56px)]" data-v-f963ee00><div class="content-wrapper" data-v-f963ee00>`);
      if (unref(exampleData).currentSection === "dashboard") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><div class="mb-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100" data-v-f963ee00><div class="bg-primary/5 p-4 border-b border-gray-100" data-v-f963ee00><div class="flex items-center" data-v-f963ee00><div class="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shadow-sm border border-primary/20" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.avatar)}</div><div class="ml-3" data-v-f963ee00><h3 class="font-medium text-gray-800" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.name)}</h3><div class="flex items-center mt-1" data-v-f963ee00><span class="text-xs bg-secondary/15 text-secondary py-1 px-2 rounded-full font-medium border border-secondary/20" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.department)}</span></div></div></div></div><div class="p-4" data-v-f963ee00><div class="grid grid-cols-2 gap-4 mb-4" data-v-f963ee00><div class="rounded-lg bg-primary/5 p-3 border border-primary/10" data-v-f963ee00><p class="text-xs text-gray-600 mb-1" data-v-f963ee00>Jumlah Bantuan</p><p class="text-lg font-semibold text-primary" data-v-f963ee00>${ssrInterpolate(unref(exampleData).dashboardData.totalBantuan)}</p></div><div class="rounded-lg bg-secondary/5 p-3 border border-secondary/10" data-v-f963ee00><p class="text-xs text-gray-600 mb-1" data-v-f963ee00>Bantuan Bulan Ini</p><p class="text-lg font-semibold text-secondary" data-v-f963ee00>${ssrInterpolate(unref(exampleData).dashboardData.bantuanBulan)}</p></div></div><div class="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/10 mb-4" data-v-f963ee00><div data-v-f963ee00><p class="text-xs text-gray-600 mb-1" data-v-f963ee00>Pembayaran Seterusnya</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).dashboardData.nextPayment)}</p></div>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-calendar-today",
          class: "text-accent",
          size: "20"
        }, null, _parent));
        _push(`</div><button class="w-full py-2.5 px-4 bg-primary text-white font-medium rounded-lg shadow-sm hover:bg-primary-dark transition flex items-center justify-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-receipt-long",
          class: "mr-2",
          size: "18"
        }, null, _parent));
        _push(` Lihat Semua Bantuan </button></div></div><h3 class="text-base font-medium mb-3 text-gray-800" data-v-f963ee00>Metrik Zakat</h3><div class="grid grid-cols-2 gap-3 mb-6" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).keyMetrics, (metric, index) => {
          _push(`<div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between" data-v-f963ee00><div class="flex justify-between items-start mb-2" data-v-f963ee00><div class="${ssrRenderClass([{
            "bg-secondary/15 text-secondary": index === 1 || index === 2,
            "bg-primary/15 text-primary": index === 0 || index === 3
          }, "w-9 h-9 rounded-md flex items-center justify-center"])}" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: metric.icon,
            size: "20"
          }, null, _parent));
          _push(`</div><div class="${ssrRenderClass([{
            "bg-secondary/15 text-secondary": metric.change === "positive",
            "bg-gray-100 text-gray-600": metric.change === "neutral",
            "bg-danger/15 text-danger": metric.change === "negative"
          }, "text-xs px-1.5 py-0.5 rounded font-medium"])}" data-v-f963ee00>${ssrInterpolate(metric.description)}</div></div><div data-v-f963ee00><p class="text-sm text-gray-600 mb-1" data-v-f963ee00>${ssrInterpolate(metric.title)}</p><p class="${ssrRenderClass([{
            "text-secondary": index === 1 || index === 2,
            "text-primary": index === 0 || index === 3
          }, "text-base font-bold"])}" data-v-f963ee00>${ssrInterpolate(metric.value)}</p></div></div>`);
        });
        _push(`<!--]--></div><h3 class="text-base font-medium mb-3 text-gray-800" data-v-f963ee00>Pengumuman</h3><div class="space-y-3 mb-6" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).dashboardData.announcements, (announcement) => {
          _push(`<div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100" data-v-f963ee00><div class="h-32 bg-gray-200" data-v-f963ee00><div class="h-full w-full flex items-center justify-center bg-primary/10 text-primary" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-image",
            size: "36"
          }, null, _parent));
          _push(`</div></div><div class="p-3" data-v-f963ee00><p class="font-medium mb-1.5" data-v-f963ee00>${ssrInterpolate(announcement.title)}</p><p class="text-sm text-gray-600 mb-2" data-v-f963ee00>${ssrInterpolate(announcement.content)}</p><div class="flex justify-between items-center" data-v-f963ee00><span class="text-xs text-gray-500" data-v-f963ee00>${ssrInterpolate(announcement.date)}</span><button class="text-primary text-sm font-medium" data-v-f963ee00>Baca Lagi</button></div></div></div>`);
        });
        _push(`<!--]--></div><h3 class="text-base font-medium mb-3 text-gray-800" data-v-f963ee00>Acara Akan Datang</h3><div class="space-y-3 mb-6" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).dashboardData.upcomingEvents, (event) => {
          _push(`<div class="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 flex items-start" data-v-f963ee00><div class="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center mr-3 border border-primary/20" data-v-f963ee00><span class="text-xs font-medium text-gray-600" data-v-f963ee00>${ssrInterpolate(event.date.split(" ")[1])}</span><span class="text-base font-bold text-primary" data-v-f963ee00>${ssrInterpolate(event.date.split(" ")[0])}</span></div><div class="flex-1" data-v-f963ee00><p class="font-medium mb-1" data-v-f963ee00>${ssrInterpolate(event.title)}</p><div class="flex items-center text-xs text-gray-500 mb-1" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-access-time",
            size: "14",
            class: "mr-1"
          }, null, _parent));
          _push(`<span data-v-f963ee00>${ssrInterpolate(event.time)}</span></div><div class="flex items-center text-xs text-gray-500" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-location-on",
            size: "14",
            class: "mr-1"
          }, null, _parent));
          _push(`<span data-v-f963ee00>${ssrInterpolate(event.location)}</span></div></div><button class="ml-2 w-7 h-7 rounded-full flex items-center justify-center bg-primary/10 text-primary" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-arrow-forward",
            size: "16"
          }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "permohonan" && !unref(exampleData).subSection) {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><div class="flex mb-4 bg-gray-100 p-1 rounded-lg" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).permohonanTabs, (tab) => {
          _push(`<button class="${ssrRenderClass([unref(exampleData).activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-gray-600", "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200"])}" data-v-f963ee00>${ssrInterpolate(tab.title)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(exampleData).activeTab === "active") {
          _push(`<div class="space-y-4" data-v-f963ee00><!--[-->`);
          ssrRenderList(unref(exampleData).permohonanData.activeApplications, (app) => {
            _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" data-v-f963ee00><div class="border-b border-gray-100 p-3 flex justify-between items-center" data-v-f963ee00><div data-v-f963ee00><h4 class="font-medium" data-v-f963ee00>${ssrInterpolate(app.id)}</h4><p class="text-xs text-gray-600" data-v-f963ee00>${ssrInterpolate(app.submissionDate)}</p></div><div class="${ssrRenderClass([{
              "badge-lulus": app.status === "LULUS",
              "badge-menunggu": app.status === "MENUNGGU",
              "badge-dalam-proses": app.status === "DALAM PROSES",
              "badge-ditolak": app.status === "DITOLAK"
            }, "py-1 px-2.5 rounded-full text-xs font-medium"])}" data-v-f963ee00>${ssrInterpolate(app.status)}</div></div><div class="p-3" data-v-f963ee00><div class="mb-3" data-v-f963ee00><h3 class="font-medium text-gray-800" data-v-f963ee00>${ssrInterpolate(app.type)}</h3><p class="text-sm text-gray-600" data-v-f963ee00>${ssrInterpolate(app.amount)}</p></div><div class="space-y-2 mb-3" data-v-f963ee00><div class="flex text-sm" data-v-f963ee00><div class="w-24 text-gray-500" data-v-f963ee00>Pemohon</div><div class="font-medium" data-v-f963ee00>${ssrInterpolate(app.pemohon)}</div></div><div class="flex text-sm" data-v-f963ee00><div class="w-24 text-gray-500" data-v-f963ee00>No. IC</div><div class="font-medium" data-v-f963ee00>${ssrInterpolate(app.noIC)}</div></div><div class="flex text-sm" data-v-f963ee00><div class="w-24 text-gray-500" data-v-f963ee00>Telefon</div><div class="font-medium" data-v-f963ee00>${ssrInterpolate(app.telefon)}</div></div></div><div class="flex justify-end space-x-2" data-v-f963ee00><button class="p-2 rounded-full bg-primary/10 text-primary" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-edit",
              size: "18"
            }, null, _parent));
            _push(`</button><button class="p-2 rounded-full bg-secondary/10 text-secondary" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-visibility",
              size: "18"
            }, null, _parent));
            _push(`</button><button class="p-2 rounded-full bg-danger/10 text-danger" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-delete",
              size: "18"
            }, null, _parent));
            _push(`</button></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(exampleData).permohonanData.activeApplications.length === 0) {
            _push(`<div class="text-center py-10" data-v-f963ee00><div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-article",
              size: "28",
              class: "text-gray-400"
            }, null, _parent));
            _push(`</div><h3 class="font-medium text-gray-700 mb-1" data-v-f963ee00>Tiada Permohonan Aktif</h3><p class="text-sm text-gray-500 mb-4" data-v-f963ee00>Anda tidak mempunyai sebarang permohonan aktif buat masa ini.</p><button class="px-4 py-2 bg-primary text-white rounded-lg font-medium shadow-sm" data-v-f963ee00> Buat Permohonan Baru </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(exampleData).activeTab === "draft") {
          _push(`<div class="space-y-4" data-v-f963ee00><!--[-->`);
          ssrRenderList(unref(exampleData).permohonanData.draftApplications, (app) => {
            _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" data-v-f963ee00><div class="border-b border-gray-100 p-3 flex justify-between items-center" data-v-f963ee00><div data-v-f963ee00><h4 class="font-medium" data-v-f963ee00>${ssrInterpolate(app.id)}</h4><p class="text-xs text-gray-600" data-v-f963ee00>Dikemaskini: ${ssrInterpolate(app.lastUpdated)}</p></div><div class="badge-deraf px-2.5 py-1 rounded-full text-xs font-medium" data-v-f963ee00> DRAF </div></div><div class="p-3" data-v-f963ee00><h3 class="font-medium text-gray-800 mb-3" data-v-f963ee00>${ssrInterpolate(app.type)}</h3><div class="flex justify-end space-x-2" data-v-f963ee00><button class="px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium shadow-sm" data-v-f963ee00> Teruskan </button><button class="px-3 py-1.5 rounded-md bg-danger/10 text-danger text-sm font-medium" data-v-f963ee00> Padam </button></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(exampleData).permohonanData.draftApplications.length === 0) {
            _push(`<div class="text-center py-10" data-v-f963ee00><div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-draft",
              size: "28",
              class: "text-gray-400"
            }, null, _parent));
            _push(`</div><h3 class="font-medium text-gray-700 mb-1" data-v-f963ee00>Tiada Draf</h3><p class="text-sm text-gray-500 mb-4" data-v-f963ee00>Anda tidak mempunyai sebarang draf permohonan buat masa ini.</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(exampleData).activeTab === "history") {
          _push(`<div class="space-y-4" data-v-f963ee00><!--[-->`);
          ssrRenderList(unref(exampleData).permohonanData.historicalApplications, (app) => {
            _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" data-v-f963ee00><div class="border-b border-gray-100 p-3 flex justify-between items-center" data-v-f963ee00><div data-v-f963ee00><h4 class="font-medium" data-v-f963ee00>${ssrInterpolate(app.id)}</h4><p class="text-xs text-gray-600" data-v-f963ee00>${ssrInterpolate(app.submissionDate)}</p></div><div class="${ssrRenderClass([{
              "badge-lulus": app.status === "LULUS",
              "badge-menunggu": app.status === "MENUNGGU",
              "badge-dalam-proses": app.status === "DALAM PROSES",
              "badge-ditolak": app.status === "DITOLAK"
            }, "py-1 px-2.5 rounded-full text-xs font-medium"])}" data-v-f963ee00>${ssrInterpolate(app.status)}</div></div><div class="p-3" data-v-f963ee00><div class="mb-3" data-v-f963ee00><h3 class="font-medium text-gray-800" data-v-f963ee00>${ssrInterpolate(app.type)}</h3><p class="text-sm text-gray-600" data-v-f963ee00>${ssrInterpolate(app.amount)}</p></div>`);
            if (app.reason) {
              _push(`<div class="p-2 bg-danger/5 rounded-md mb-3 border border-danger/10" data-v-f963ee00><p class="text-sm text-danger" data-v-f963ee00>${ssrInterpolate(app.reason)}</p></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex justify-end" data-v-f963ee00><button class="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium" data-v-f963ee00> Lihat Butiran </button></div></div></div>`);
          });
          _push(`<!--]-->`);
          if (unref(exampleData).permohonanData.historicalApplications.length === 0) {
            _push(`<div class="text-center py-10" data-v-f963ee00><div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3" data-v-f963ee00>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "ic:baseline-history",
              size: "28",
              class: "text-gray-400"
            }, null, _parent));
            _push(`</div><h3 class="font-medium text-gray-700 mb-1" data-v-f963ee00>Tiada Sejarah</h3><p class="text-sm text-gray-500" data-v-f963ee00>Anda belum mempunyai sebarang sejarah permohonan.</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "bantuan" && !unref(exampleData).subSection) {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><div class="flex justify-between items-center mb-4" data-v-f963ee00><h3 class="text-base font-medium text-gray-800" data-v-f963ee00>Bantuan Aktif</h3><button class="px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium shadow-sm flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-add",
          size: "18",
          class: "mr-1"
        }, null, _parent));
        _push(` Bantuan Baru </button></div><div class="space-y-4 mb-6" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).bantuanData.activeBantuan, (bantuan) => {
          _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" data-v-f963ee00><div class="border-b border-gray-100 p-3 flex justify-between items-center" data-v-f963ee00><div data-v-f963ee00><h4 class="font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.type)}</h4><p class="text-xs text-gray-600" data-v-f963ee00>${ssrInterpolate(bantuan.referenceNo)}</p></div><div class="badge-aktif py-1 px-2.5 rounded-full text-xs font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.status)}</div></div><div class="p-3" data-v-f963ee00><div class="mb-3" data-v-f963ee00><div class="grid grid-cols-2 gap-3" data-v-f963ee00><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Jumlah</p><p class="font-medium text-secondary" data-v-f963ee00>${ssrInterpolate(bantuan.amount)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Kategori</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.category)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Tarikh Mula</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.startDate)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Tarikh Tamat</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.endDate)}</p></div></div></div><div class="flex items-center p-2 bg-accent/5 rounded-lg border border-accent/20 mb-3" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-calendar-today",
            class: "text-accent mr-2",
            size: "18"
          }, null, _parent));
          _push(`<div data-v-f963ee00><p class="text-xs text-gray-600 mb-0.5" data-v-f963ee00>Pembayaran Seterusnya</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(bantuan.nextPayment)}</p></div></div><div class="flex justify-end space-x-2" data-v-f963ee00><button class="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium" data-v-f963ee00> Lihat Butiran </button><button class="px-3 py-1.5 rounded-md bg-secondary text-white text-sm font-medium shadow-sm" data-v-f963ee00> Semak Status </button></div></div></div>`);
        });
        _push(`<!--]--></div><h3 class="text-base font-medium mb-3 text-gray-800" data-v-f963ee00>Sejarah Pembayaran</h3><div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6" data-v-f963ee00><div class="divide-y divide-gray-100" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).bantuanData.paymentHistory.slice(0, 3), (payment) => {
          _push(`<div class="p-3" data-v-f963ee00><div class="flex justify-between items-center" data-v-f963ee00><div data-v-f963ee00><p class="font-medium" data-v-f963ee00>${ssrInterpolate(payment.amount)}</p><p class="text-xs text-gray-600" data-v-f963ee00>${ssrInterpolate(payment.date)}</p></div><div class="text-right" data-v-f963ee00><p class="text-sm" data-v-f963ee00>${ssrInterpolate(payment.type)}</p><span class="text-xs px-1.5 py-0.5 bg-secondary/10 text-secondary rounded-full" data-v-f963ee00>${ssrInterpolate(payment.status)}</span></div></div></div>`);
        });
        _push(`<!--]--></div><div class="p-2 border-t border-gray-100 text-center" data-v-f963ee00><button class="text-sm text-primary font-medium" data-v-f963ee00> Lihat Semua Pembayaran </button></div></div><h3 class="text-base font-medium mb-3 text-gray-800" data-v-f963ee00>Kemudahan Berdekatan</h3><div class="space-y-3 mb-6" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).bantuanData.nearbyFacilities, (facility) => {
          _push(`<div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100" data-v-f963ee00><div class="flex items-start" data-v-f963ee00><div class="bg-primary/10 rounded-md p-2 mr-3" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: facility.type.includes("Pejabat") ? "ic:baseline-apartment" : facility.type.includes("Agihan") ? "ic:baseline-store" : "ic:baseline-local-hospital",
            size: "20",
            class: "text-primary"
          }, null, _parent));
          _push(`</div><div class="flex-1" data-v-f963ee00><div class="flex justify-between" data-v-f963ee00><h4 class="font-medium text-gray-800" data-v-f963ee00>${ssrInterpolate(facility.name)}</h4><span class="text-xs bg-primary/5 py-0.5 px-1.5 rounded text-primary" data-v-f963ee00>${ssrInterpolate(facility.distance)}</span></div><p class="text-xs text-gray-600 mt-1" data-v-f963ee00>${ssrInterpolate(facility.address)}</p><div class="flex justify-between items-center mt-2" data-v-f963ee00><p class="text-xs text-gray-500" data-v-f963ee00>${ssrInterpolate(facility.type)}</p><button class="text-xs text-primary flex items-center" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-call",
            size: "14",
            class: "mr-1"
          }, null, _parent));
          _push(` Hubungi </button></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "notifikasi") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><div class="flex justify-between items-center mb-4" data-v-f963ee00><h3 class="text-base font-medium text-gray-800" data-v-f963ee00>Notifikasi (${ssrInterpolate(unref(exampleData).notificationData.items.length)})</h3>`);
        if (unref(exampleData).notificationData.unread > 0) {
          _push(`<button class="text-xs text-primary font-medium" data-v-f963ee00> Tandakan Semua Dibaca </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-3" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).notificationData.items, (notification) => {
          _push(`<div class="${ssrRenderClass([notification.unread ? "border-l-4 border-l-primary border-gray-100" : "border-gray-100", "bg-white rounded-xl shadow-sm border overflow-hidden transition-all"])}" data-v-f963ee00><div class="p-3.5" data-v-f963ee00><div class="flex items-start" data-v-f963ee00><div class="flex-shrink-0 mr-3" data-v-f963ee00><div class="${ssrRenderClass([{
            "bg-secondary/15 text-secondary": notification.type === "success",
            "bg-warning/15 text-warning": notification.type === "warning",
            "bg-primary/15 text-primary": notification.type === "info",
            "bg-danger/15 text-danger": notification.type === "error"
          }, "w-10 h-10 rounded-full flex items-center justify-center"])}" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: {
              "success": "ic:baseline-check-circle",
              "warning": "ic:baseline-warning",
              "info": "ic:baseline-info",
              "error": "ic:baseline-error"
            }[notification.type],
            size: "20"
          }, null, _parent));
          _push(`</div></div><div class="flex-1" data-v-f963ee00><div class="flex justify-between items-start" data-v-f963ee00><h4 class="font-medium mb-1" data-v-f963ee00>${ssrInterpolate(notification.title)}</h4><div class="flex items-center" data-v-f963ee00>`);
          if (notification.unread) {
            _push(`<span class="w-2.5 h-2.5 bg-primary rounded-full mr-2" data-v-f963ee00></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="text-gray-400" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-close",
            size: "18"
          }, null, _parent));
          _push(`</button></div></div><p class="text-sm text-gray-600 mb-2" data-v-f963ee00>${ssrInterpolate(notification.content)}</p><div class="flex justify-between items-center" data-v-f963ee00><span class="text-xs text-gray-500" data-v-f963ee00>${ssrInterpolate(notification.time)}</span>`);
          if (notification.action) {
            _push(`<button class="text-xs bg-primary/10 text-primary py-1 px-2 rounded-md font-medium" data-v-f963ee00>${ssrInterpolate(notification.actionText || "Lihat")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(exampleData).notificationData.items.length === 0) {
          _push(`<div class="text-center py-10" data-v-f963ee00><div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-notifications-off",
            size: "28",
            class: "text-gray-400"
          }, null, _parent));
          _push(`</div><h3 class="font-medium text-gray-700 mb-1" data-v-f963ee00>Tiada Notifikasi</h3><p class="text-sm text-gray-500" data-v-f963ee00>Anda tidak mempunyai sebarang notifikasi buat masa ini.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "profile") {
        _push(`<div class="pb-24" data-v-f963ee00><div class="bg-primary pb-20 pt-6 px-4 rounded-b-[40px] shadow-md relative" data-v-f963ee00><div class="flex flex-col items-center" data-v-f963ee00><div class="w-20 h-20 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-3xl shadow-md border border-white/30" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.avatar)}</div><h2 class="mt-3 text-white font-semibold text-lg" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.name)}</h2><p class="text-white/80 text-sm" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.email)}</p><div class="mt-2 bg-secondary/20 py-1 px-3 rounded-full text-white/90 text-sm flex items-center shadow-sm" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-verified-user",
          class: "mr-1.5",
          size: "16"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(exampleData).userProfile.department)}</div></div></div><div class="px-4 -mt-16" data-v-f963ee00><div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h3 class="font-medium flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-person",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Maklumat Peribadi </h3></div><div class="p-4 space-y-4" data-v-f963ee00><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>No. Kad Pengenalan</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.id)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Nombor Telefon</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.phone)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Alamat</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.address)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Jawatan</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.position)}</p></div><div data-v-f963ee00><p class="text-xs text-gray-500 mb-1" data-v-f963ee00>Tarikh Kelulusan</p><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.joinDate)}</p></div></div><div class="border-t border-gray-100 p-3 flex justify-end" data-v-f963ee00><button class="text-sm bg-primary/10 text-primary py-1.5 px-3 rounded-lg font-medium" data-v-f963ee00> Kemaskini Maklumat </button></div></div><div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h3 class="font-medium flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-settings",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Tetapan Akaun </h3></div><div class="divide-y divide-gray-100" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).userProfile.actions, (action) => {
          _push(`<button class="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors" data-v-f963ee00><div class="flex items-center" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: action.icon,
            size: "20",
            class: "text-gray-500 mr-3"
          }, null, _parent));
          _push(`<span data-v-f963ee00>${ssrInterpolate(action.name)}</span></div>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-arrow-forward-ios",
            size: "16",
            class: "text-gray-400"
          }, null, _parent));
          _push(`</button>`);
        });
        _push(`<!--]--></div></div><div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h3 class="font-medium flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-support-agent",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Sokongan </h3></div><div class="p-4" data-v-f963ee00><div class="bg-primary/5 rounded-lg p-3 border border-primary/10 flex items-start mb-3" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-info",
          class: "text-primary mr-2 mt-0.5",
          size: "18"
        }, null, _parent));
        _push(`<div data-v-f963ee00><p class="text-sm font-medium mb-1" data-v-f963ee00>Pusat Bantuan</p><p class="text-xs text-gray-600" data-v-f963ee00>Dapatkan jawapan untuk soalan lazim dan bantuan menggunakan aplikasi ini.</p></div></div><div class="bg-gray-100 rounded-lg p-4 flex items-center justify-between" data-v-f963ee00><div data-v-f963ee00><p class="text-sm font-medium" data-v-f963ee00>Hubungi Kami</p><p class="text-xs text-gray-600" data-v-f963ee00>603-9235 5678</p></div><button class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-call",
          size: "20"
        }, null, _parent));
        _push(`</button></div></div></div><button class="w-full py-3 bg-danger/10 text-danger rounded-lg font-medium mb-6 flex items-center justify-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-logout",
          class: "mr-2",
          size: "20"
        }, null, _parent));
        _push(` Log Keluar </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([{ "rotate-45": unref(exampleData).showFabMenu }, "fab bg-primary text-white shadow-lg hover:bg-primary-dark transition-transform"])}" data-v-f963ee00>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-add",
        size: "24"
      }, null, _parent));
      _push(`</div>`);
      if (unref(exampleData).showFabMenu) {
        _push(`<div class="fab-menu" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).permohonanData.applicationTypes.slice(0, 3), (type, index) => {
          _push(`<div class="${ssrRenderClass([{ "expanded": unref(animationStates).fabExpanded }, "fab-item"])}" style="${ssrRenderStyle({ "transition-delay": `${0.05 * (unref(exampleData).permohonanData.applicationTypes.slice(0, 3).length - index)}s` })}" data-v-f963ee00><div class="fab-item-text shadow-md bg-white" data-v-f963ee00>${ssrInterpolate(type.name)}</div><button class="fab-item-button bg-primary text-white shadow-lg hover:bg-primary-dark transition-all" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:baseline-add",
            size: "20"
          }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(exampleData).showMenu) {
        _push(`<div class="mobile-drawer" data-v-f963ee00><div class="${ssrRenderClass([unref(animationStates).menuExpanded ? "bg-opacity-50" : "bg-opacity-0", "absolute inset-0 bg-black transition-opacity w-full h-full"])}" data-v-f963ee00></div><div class="${ssrRenderClass([{ "expanded": unref(animationStates).menuExpanded }, "drawer-content absolute left-0 top-0 bottom-0 w-4/5 max-w-[260px] bg-white flex flex-col shadow-2xl"])}" data-v-f963ee00><div class="bg-sidebar p-4 text-white" data-v-f963ee00><div class="flex items-center space-x-3" data-v-f963ee00><div class="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center font-bold text-xl shadow-md" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.avatar)}</div><div data-v-f963ee00><p class="font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.name)}</p><p class="text-xs opacity-80" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.email)}</p><div class="mt-2 bg-accent/20 py-1 px-2 rounded-full inline-flex items-center shadow-sm" data-v-f963ee00><span class="text-xs font-medium text-accent" data-v-f963ee00>${ssrInterpolate(unref(exampleData).userProfile.department)}</span></div></div></div></div><div class="overflow-y-auto flex-1" data-v-f963ee00><div class="py-2" data-v-f963ee00><!--[-->`);
        ssrRenderList(unref(exampleData).demoPages, (page, index) => {
          _push(`<button class="${ssrRenderClass([{ "border-l-4 border-accent bg-primary/5": unref(exampleData).currentSection === page.id }, "w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"])}" data-v-f963ee00>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: page.icon,
            class: ["mr-3", unref(exampleData).currentSection === page.id ? "text-primary" : "text-gray-600"],
            size: "20"
          }, null, _parent));
          _push(`<span class="${ssrRenderClass(unref(exampleData).currentSection === page.id ? "text-primary font-medium" : "")}" data-v-f963ee00>${ssrInterpolate(page.title)}</span>`);
          if (page.id === "permohonan" && unref(exampleData).permohonanData.activeApplications.length > 0) {
            _push(`<span class="ml-2 bg-accent text-primary text-xs px-2 py-0.5 rounded-full font-bold" data-v-f963ee00>${ssrInterpolate(unref(exampleData).permohonanData.activeApplications.length)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--><div class="border-t border-gray-200 my-2" data-v-f963ee00></div><button class="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-help",
          class: "mr-3 text-gray-600",
          size: "20"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Bantuan</span></button><button class="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-info",
          class: "mr-3 text-gray-600",
          size: "20"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Tentang Kami</span></button></div></div><div class="border-t border-gray-200 p-4" data-v-f963ee00><button class="flex items-center text-red-600" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-logout",
          class: "mr-2",
          size: "20"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Log Keluar</span></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bottom-nav-container" data-v-f963ee00><div class="bottom-nav bg-white shadow-lg border-t flex justify-around py-2" data-v-f963ee00><!--[-->`);
      ssrRenderList(unref(exampleData).demoPages, (page) => {
        _push(`<button class="${ssrRenderClass([unref(exampleData).currentSection === page.id ? "text-primary" : "text-gray-500", "flex flex-col items-center p-2 relative"])}" data-v-f963ee00><div class="${ssrRenderClass([unref(exampleData).currentSection === page.id ? "bg-primary/10 rounded-full" : "", "w-6 h-6 flex items-center justify-center"])}" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: page.icon,
          size: "20"
        }, null, _parent));
        _push(`</div><span class="${ssrRenderClass([unref(exampleData).currentSection === page.id ? "font-medium" : "", "text-xs mt-1"])}" data-v-f963ee00>${ssrInterpolate(page.title)}</span>`);
        if (page.id === "permohonan" && unref(exampleData).permohonanData.activeApplications.length > 0) {
          _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-primary text-[8px] font-bold flex items-center justify-center shadow-sm" data-v-f963ee00>${ssrInterpolate(unref(exampleData).permohonanData.activeApplications.length)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (page.id === "notifikasi" && unref(exampleData).notificationData.unread > 0) {
          _push(`<span class="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-primary text-[8px] font-bold flex items-center justify-center shadow-sm" data-v-f963ee00>${ssrInterpolate(unref(exampleData).notificationData.unread)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div></div><div class="h-4 bg-black pixel-nav-bar flex justify-center items-center" data-v-f963ee00><div class="w-1/3 h-1 bg-white rounded-full" data-v-f963ee00></div></div></div></div></div></div>`);
      if (unref(exampleData).currentSection === "bantuan" && unref(exampleData).subSection === "new") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><h3 class="h3 mb-4 text-gray-800" data-v-f963ee00>Permohonan Bantuan Baru</h3><div class="mb-6" data-v-f963ee00><div class="flex items-center justify-between" data-v-f963ee00><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>1</div><span class="text-xs font-medium mt-1 text-primary" data-v-f963ee00>Maklumat</span></div><div class="flex-1 h-1 mx-2 bg-primary" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium text-sm" data-v-f963ee00>2</div><span class="text-xs font-medium mt-1 text-gray-500" data-v-f963ee00>Dokumen</span></div><div class="flex-1 h-1 mx-2 bg-gray-200" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium text-sm" data-v-f963ee00>3</div><span class="text-xs font-medium mt-1 text-gray-500" data-v-f963ee00>Pengesahan</span></div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-person",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Maklumat Peribadi </h4></div><div class="p-4 space-y-4" data-v-f963ee00><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Jenis Bantuan <span class="text-danger" data-v-f963ee00>*</span></label><select class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.type }, "form-input w-full"])}" data-v-f963ee00><option value="" disabled selected data-v-f963ee00>-- Pilih Jenis Bantuan --</option><!--[-->`);
        ssrRenderList(unref(exampleData).bantuanData.bantuanCategories, (type) => {
          _push(`<option${ssrRenderAttr("value", type.name)} data-v-f963ee00>${ssrInterpolate(type.name)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(exampleData).formErrors.type) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila pilih jenis bantuan</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(exampleData).bantuanForm.type) {
          _push(`<div class="mt-2 p-2 bg-primary/5 rounded-md text-xs" data-v-f963ee00><p class="font-medium mb-1" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.type)}</p><p class="text-gray-600" data-v-f963ee00>${ssrInterpolate(((_a = unref(exampleData).bantuanData.bantuanCategories.find((t) => t.name === unref(exampleData).bantuanForm.type)) == null ? void 0 : _a.description) || "")}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Kategori Asnaf <span class="text-danger" data-v-f963ee00>*</span></label><select class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.category }, "form-input w-full"])}" data-v-f963ee00><option value="" disabled selected data-v-f963ee00>-- Pilih Kategori Asnaf --</option><option value="Fakir" data-v-f963ee00>Fakir</option><option value="Miskin" data-v-f963ee00>Miskin</option><option value="Amil" data-v-f963ee00>Amil</option><option value="Muallaf" data-v-f963ee00>Muallaf</option><option value="Gharimin" data-v-f963ee00>Gharimin</option><option value="Fisabilillah" data-v-f963ee00>Fisabilillah</option><option value="Ibnu Sabil" data-v-f963ee00>Ibnu Sabil</option></select>`);
        if (unref(exampleData).formErrors.category) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila pilih kategori asnaf</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Nama Penuh <span class="text-danger" data-v-f963ee00>*</span></label><input type="text"${ssrRenderAttr("value", unref(exampleData).bantuanForm.fullName)} class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.fullName }, "form-input w-full"])}" placeholder="Masukkan nama penuh" data-v-f963ee00>`);
        if (unref(exampleData).formErrors.fullName) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan nama penuh</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>No. Kad Pengenalan <span class="text-danger" data-v-f963ee00>*</span></label><input type="text"${ssrRenderAttr("value", unref(exampleData).bantuanForm.idNumber)} class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.idNumber }, "form-input w-full"])}" placeholder="Cth: 860215-14-5732" data-v-f963ee00>`);
        if (unref(exampleData).formErrors.idNumber) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan nombor kad pengenalan yang sah</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-contact-phone",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Maklumat Perhubungan </h4></div><div class="p-4 space-y-4" data-v-f963ee00><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>No. Telefon <span class="text-danger" data-v-f963ee00>*</span></label><input type="tel"${ssrRenderAttr("value", unref(exampleData).bantuanForm.phone)} class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.phone }, "form-input w-full"])}" placeholder="Cth: 019-8765432" data-v-f963ee00>`);
        if (unref(exampleData).formErrors.phone) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan nombor telefon yang sah</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Alamat E-mel</label><input type="email"${ssrRenderAttr("value", unref(exampleData).bantuanForm.email)} class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.email }, "form-input w-full"])}" placeholder="Cth: nama@contoh.com" data-v-f963ee00>`);
        if (unref(exampleData).formErrors.email) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan alamat e-mel yang sah</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Alamat <span class="text-danger" data-v-f963ee00>*</span></label><textarea class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.address }, "form-input w-full min-h-[80px]"])}" placeholder="Masukkan alamat penuh" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.address)}</textarea>`);
        if (unref(exampleData).formErrors.address) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan alamat</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-account-balance",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Maklumat Bank </h4></div><div class="p-4 space-y-4" data-v-f963ee00><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Nama Bank <span class="text-danger" data-v-f963ee00>*</span></label><select class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.bankName }, "form-input w-full"])}" data-v-f963ee00><option value="" disabled selected data-v-f963ee00>-- Pilih Bank --</option><option value="Bank Islam" data-v-f963ee00>Bank Islam</option><option value="Maybank" data-v-f963ee00>Maybank</option><option value="CIMB Bank" data-v-f963ee00>CIMB Bank</option><option value="Bank Rakyat" data-v-f963ee00>Bank Rakyat</option><option value="RHB Bank" data-v-f963ee00>RHB Bank</option></select>`);
        if (unref(exampleData).formErrors.bankName) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila pilih bank</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>No. Akaun Bank <span class="text-danger" data-v-f963ee00>*</span></label><input type="text"${ssrRenderAttr("value", unref(exampleData).bantuanForm.accountNumber)} class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.accountNumber }, "form-input w-full"])}" placeholder="Masukkan nombor akaun bank" data-v-f963ee00>`);
        if (unref(exampleData).formErrors.accountNumber) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila masukkan nombor akaun yang sah</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-info",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Sebab Permohonan </h4></div><div class="p-4 space-y-4" data-v-f963ee00><div data-v-f963ee00><label class="form-label mb-1.5 block" data-v-f963ee00>Alasan Memohon <span class="text-danger" data-v-f963ee00>*</span></label><textarea class="${ssrRenderClass([{ "border-danger": unref(exampleData).formErrors.reason }, "form-input w-full min-h-[100px]"])}" placeholder="Sila nyatakan sebab keperluan bantuan dengan terperinci" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.reason)}</textarea>`);
        if (unref(exampleData).formErrors.reason) {
          _push(`<p class="text-danger text-xs mt-1" data-v-f963ee00>Sila nyatakan alasan permohonan</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="flex justify-between items-center mt-6 mb-4" data-v-f963ee00><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-save",
          class: "mr-2",
          size: "18"
        }, null, _parent));
        _push(` Simpan Draf </button><button class="px-4 py-2 bg-primary text-white rounded-lg shadow-sm flex items-center" data-v-f963ee00> Langkah Seterusnya `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-arrow-forward",
          class: "ml-2",
          size: "18"
        }, null, _parent));
        _push(`</button></div><div class="bg-primary/5 p-3 rounded-lg border border-primary/10 mb-4 flex items-start" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-info",
          class: "text-primary mr-2 mt-0.5",
          size: "18"
        }, null, _parent));
        _push(`<div class="text-xs" data-v-f963ee00><p class="font-medium mb-1" data-v-f963ee00>Bantuan untuk pengisian</p><p class="text-gray-600" data-v-f963ee00>Sila isi semua maklumat yang diperlukan dengan tepat. Medan bertanda <span class="text-danger" data-v-f963ee00>*</span> adalah wajib.</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "bantuan" && unref(exampleData).subSection === "documents") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><h3 class="h3 mb-4 text-gray-800" data-v-f963ee00>Muat Naik Dokumen</h3><div class="mb-6" data-v-f963ee00><div class="flex items-center justify-between" data-v-f963ee00><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check",
          size: "16"
        }, null, _parent));
        _push(`</div><span class="text-xs font-medium mt-1 text-secondary" data-v-f963ee00>Maklumat</span></div><div class="flex-1 h-1 mx-2 bg-primary" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>2</div><span class="text-xs font-medium mt-1 text-primary" data-v-f963ee00>Dokumen</span></div><div class="flex-1 h-1 mx-2 bg-gray-200" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-medium text-sm" data-v-f963ee00>3</div><span class="text-xs font-medium mt-1 text-gray-500" data-v-f963ee00>Pengesahan</span></div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-description",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Dokumen Wajib </h4></div><div class="p-4" data-v-f963ee00><div class="mb-4 border border-gray-100 rounded-lg p-3" data-v-f963ee00><div class="flex justify-between items-start mb-2" data-v-f963ee00><div data-v-f963ee00><h5 class="h5 text-gray-800" data-v-f963ee00>Kad Pengenalan</h5><p class="text-xs text-gray-500" data-v-f963ee00>Salinan depan dan belakang</p></div><span class="text-xs bg-warning/15 text-warning py-0.5 px-2 rounded-full font-medium" data-v-f963ee00>Diperlukan</span></div><button class="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-cloud-upload",
          size: "24",
          class: "text-primary mb-2"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700" data-v-f963ee00>Klik untuk muat naik</span><span class="text-xs text-gray-500 mt-1" data-v-f963ee00>Format: JPG, PNG, PDF</span></button></div><div class="mb-4 border border-gray-100 rounded-lg p-3" data-v-f963ee00><div class="flex justify-between items-start mb-2" data-v-f963ee00><div data-v-f963ee00><h5 class="h5 text-gray-800" data-v-f963ee00>Bukti Pendapatan</h5><p class="text-xs text-gray-500" data-v-f963ee00>Slip gaji / Penyata pencen / Penyata Pendapatan</p></div><span class="text-xs bg-warning/15 text-warning py-0.5 px-2 rounded-full font-medium" data-v-f963ee00>Diperlukan</span></div><button class="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-cloud-upload",
          size: "24",
          class: "text-primary mb-2"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700" data-v-f963ee00>Klik untuk muat naik</span><span class="text-xs text-gray-500 mt-1" data-v-f963ee00>Format: JPG, PNG, PDF</span></button></div><div class="mb-4 border border-gray-100 rounded-lg p-3" data-v-f963ee00><div class="flex justify-between items-start mb-2" data-v-f963ee00><div data-v-f963ee00><h5 class="h5 text-gray-800" data-v-f963ee00>Penyata Bank</h5><p class="text-xs text-gray-500" data-v-f963ee00>Penyata bank 3 bulan terkini</p></div><span class="text-xs bg-warning/15 text-warning py-0.5 px-2 rounded-full font-medium" data-v-f963ee00>Diperlukan</span></div><button class="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-cloud-upload",
          size: "24",
          class: "text-primary mb-2"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700" data-v-f963ee00>Klik untuk muat naik</span><span class="text-xs text-gray-500 mt-1" data-v-f963ee00>Format: JPG, PNG, PDF</span></button></div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-backup",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Dokumen Sokongan </h4></div><div class="p-4" data-v-f963ee00><div class="mb-4 border border-gray-100 rounded-lg p-3" data-v-f963ee00><div class="flex justify-between items-start mb-2" data-v-f963ee00><div data-v-f963ee00><h5 class="h5 text-gray-800" data-v-f963ee00>Laporan Perubatan</h5><p class="text-xs text-gray-500" data-v-f963ee00>Jika berkenaan</p></div><span class="text-xs bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full font-medium" data-v-f963ee00>Pilihan</span></div><button class="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-cloud-upload",
          size: "24",
          class: "text-primary mb-2"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700" data-v-f963ee00>Klik untuk muat naik</span><span class="text-xs text-gray-500 mt-1" data-v-f963ee00>Format: JPG, PNG, PDF</span></button></div><button class="w-full py-2.5 text-sm text-primary flex items-center justify-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-add",
          size: "18",
          class: "mr-1"
        }, null, _parent));
        _push(` Tambah Dokumen Lain </button></div></div><div class="flex justify-between items-center mt-6 mb-4" data-v-f963ee00><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-arrow-back",
          class: "mr-2",
          size: "18"
        }, null, _parent));
        _push(` Kembali </button><button class="px-4 py-2 bg-primary text-white rounded-lg shadow-sm flex items-center" data-v-f963ee00> Langkah Seterusnya `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-arrow-forward",
          class: "ml-2",
          size: "18"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "bantuan" && unref(exampleData).subSection === "review") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><h3 class="h3 mb-4 text-gray-800" data-v-f963ee00>Semak &amp; Hantar</h3><div class="mb-6" data-v-f963ee00><div class="flex items-center justify-between" data-v-f963ee00><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check",
          size: "16"
        }, null, _parent));
        _push(`</div><span class="text-xs font-medium mt-1 text-secondary" data-v-f963ee00>Maklumat</span></div><div class="flex-1 h-1 mx-2 bg-secondary" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check",
          size: "16"
        }, null, _parent));
        _push(`</div><span class="text-xs font-medium mt-1 text-secondary" data-v-f963ee00>Dokumen</span></div><div class="flex-1 h-1 mx-2 bg-primary" data-v-f963ee00></div><div class="flex flex-col items-center" data-v-f963ee00><div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm shadow-sm" data-v-f963ee00>3</div><span class="text-xs font-medium mt-1 text-primary" data-v-f963ee00>Pengesahan</span></div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-summarize",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Ringkasan Permohonan </h4></div><div class="p-4" data-v-f963ee00><div class="mb-4" data-v-f963ee00><h5 class="h5 mb-2 text-gray-800" data-v-f963ee00>Maklumat Bantuan</h5><div class="bg-gray-50 rounded-lg p-3 space-y-2" data-v-f963ee00><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Jenis Bantuan:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.type || "Bantuan Sara Hidup")}</span></div><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Kategori Asnaf:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.category || "Fakir")}</span></div></div></div><div class="mb-4" data-v-f963ee00><h5 class="h5 mb-2 text-gray-800" data-v-f963ee00>Maklumat Peribadi</h5><div class="bg-gray-50 rounded-lg p-3 space-y-2" data-v-f963ee00><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Nama Penuh:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.fullName || unref(exampleData).userProfile.name)}</span></div><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>No. Kad Pengenalan:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.idNumber || unref(exampleData).userProfile.id)}</span></div><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>No. Telefon:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.phone || unref(exampleData).userProfile.phone)}</span></div><div class="flex justify-between items-start" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Alamat:</span><span class="text-sm font-medium text-right max-w-[60%]" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.address || unref(exampleData).userProfile.address)}</span></div></div></div><div class="mb-4" data-v-f963ee00><h5 class="h5 mb-2 text-gray-800" data-v-f963ee00>Maklumat Bank</h5><div class="bg-gray-50 rounded-lg p-3 space-y-2" data-v-f963ee00><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Nama Bank:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.bankName || "Bank Islam")}</span></div><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>No. Akaun:</span><span class="text-sm font-medium" data-v-f963ee00>${ssrInterpolate(unref(exampleData).bantuanForm.accountNumber || "xxxx-xxx-xxxxx")}</span></div></div></div><div data-v-f963ee00><h5 class="h5 mb-2 text-gray-800" data-v-f963ee00>Dokumen</h5><div class="bg-gray-50 rounded-lg p-3" data-v-f963ee00><div class="flex items-center mb-2" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check-circle",
          class: "text-secondary mr-2",
          size: "16"
        }, null, _parent));
        _push(`<span class="text-sm" data-v-f963ee00>Kad Pengenalan (dimuat naik)</span></div><div class="flex items-center mb-2" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check-circle",
          class: "text-secondary mr-2",
          size: "16"
        }, null, _parent));
        _push(`<span class="text-sm" data-v-f963ee00>Bukti Pendapatan (dimuat naik)</span></div><div class="flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check-circle",
          class: "text-secondary mr-2",
          size: "16"
        }, null, _parent));
        _push(`<span class="text-sm" data-v-f963ee00>Penyata Bank (dimuat naik)</span></div></div></div></div></div><div class="bg-white rounded-xl shadow-md border border-gray-100 mb-5" data-v-f963ee00><div class="border-b border-gray-100 p-4" data-v-f963ee00><h4 class="h4 flex items-center text-gray-800" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-gavel",
          class: "mr-2 text-primary",
          size: "20"
        }, null, _parent));
        _push(` Pengakuan </h4></div><div class="p-4" data-v-f963ee00><div class="bg-gray-50 p-3 rounded-lg mb-3 text-sm text-gray-700" data-v-f963ee00><p data-v-f963ee00>Saya mengaku bahawa segala maklumat yang diberikan dalam permohonan ini adalah benar dan tepat. Saya faham bahawa sebarang maklumat palsu boleh menyebabkan permohonan ditolak dan tindakan undang-undang diambil.</p></div><div class="flex items-center mb-3" data-v-f963ee00><input type="checkbox" id="agreement" class="mr-2 h-4 w-4 text-primary focus:ring-primary" data-v-f963ee00><label for="agreement" class="text-sm" data-v-f963ee00>Saya bersetuju dengan syarat-syarat yang dinyatakan di atas</label></div></div></div><div class="flex justify-between items-center mt-6 mb-4" data-v-f963ee00><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-arrow-back",
          class: "mr-2",
          size: "18"
        }, null, _parent));
        _push(` Kembali </button><button class="px-5 py-2.5 bg-primary text-white rounded-lg shadow-sm flex items-center font-medium" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-send",
          class: "mr-2",
          size: "18"
        }, null, _parent));
        _push(` Hantar Permohonan </button></div><div class="bg-warning/5 p-3 rounded-lg border border-warning/10 mb-4 flex items-start" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-info",
          class: "text-warning mr-2 mt-0.5",
          size: "18"
        }, null, _parent));
        _push(`<div class="text-xs" data-v-f963ee00><p class="font-medium mb-1" data-v-f963ee00>Peringatan Penting</p><p class="text-gray-600" data-v-f963ee00>Sila semak semua maklumat dengan teliti sebelum menghantar. Permohonan yang telah dihantar tidak boleh diedit.</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(exampleData).currentSection === "bantuan" && unref(exampleData).subSection === "success") {
        _push(`<div class="p-4 pb-24" data-v-f963ee00><div class="text-center py-8" data-v-f963ee00><div class="w-20 h-20 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-6" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-check-circle",
          class: "text-secondary",
          size: "48"
        }, null, _parent));
        _push(`</div><h3 class="h3 mb-2 text-gray-800" data-v-f963ee00>Permohonan Berjaya Dihantar!</h3><p class="text-gray-600 mb-6" data-v-f963ee00>Terima kasih. Permohonan anda telah berjaya dihantar dan kini dalam proses semakan.</p><div class="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-6 text-left" data-v-f963ee00><div class="flex justify-between items-center mb-3" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Nombor Rujukan:</span><span class="font-bold text-primary" data-v-f963ee00>BSH-23/5789</span></div><div class="flex justify-between items-center mb-3" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Tarikh Permohonan:</span><span class="font-medium" data-v-f963ee00>10 Jun 2023</span></div><div class="flex justify-between items-center" data-v-f963ee00><span class="text-sm text-gray-600" data-v-f963ee00>Status:</span><span class="badge-menunggu py-1 px-2.5 rounded-full text-xs font-medium" data-v-f963ee00>MENUNGGU</span></div></div><div class="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-6 text-left" data-v-f963ee00><h5 class="h5 mb-2 text-primary" data-v-f963ee00>Langkah Seterusnya</h5><ul class="text-sm space-y-2" data-v-f963ee00><li class="flex items-start" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-circle",
          class: "text-primary mr-2 mt-1",
          size: "8"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Permohonan anda akan disemak dalam tempoh 7-14 hari bekerja.</span></li><li class="flex items-start" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-circle",
          class: "text-primary mr-2 mt-1",
          size: "8"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Anda akan menerima notifikasi sebarang kemajuan melalui SMS atau sistem ini.</span></li><li class="flex items-start" data-v-f963ee00>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-circle",
          class: "text-primary mr-2 mt-1",
          size: "8"
        }, null, _parent));
        _push(`<span data-v-f963ee00>Pegawai kami mungkin akan menghubungi anda jika maklumat tambahan diperlukan.</span></li></ul></div><div class="flex flex-col space-y-3" data-v-f963ee00><button class="w-full py-3 bg-primary text-white rounded-lg shadow-sm font-medium" data-v-f963ee00> Kembali ke Halaman Bantuan </button><button class="w-full py-3 bg-primary/10 text-primary rounded-lg font-medium" data-v-f963ee00> Semak Status Permohonan </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kitchen-sink/mobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mobile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f963ee00"]]);

export { mobile as default };
//# sourceMappingURL=mobile-a9d1797c.mjs.map
