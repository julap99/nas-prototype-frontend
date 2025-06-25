import { _ as __nuxt_component_0 } from './Breadcrumb-ad3969ad.mjs';
import { _ as __nuxt_component_0$1 } from './RsCard-455c542d.mjs';
import { _ as __nuxt_component_1$1 } from '../server.mjs';
import { _ as __nuxt_component_0$2 } from './client-only-29ef7f45.mjs';
import { ref, computed, resolveComponent, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import './nuxt-link-26e5a74c.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const topAirports = ref([
      {
        rank: 1,
        name: "Lapangan Terbang Antarabangsa Kuala Lumpur (KLIA)",
        visitors: 62e6
      },
      {
        rank: 2,
        name: "Lapangan Terbang Antarabangsa Kota Kinabalu",
        visitors: 9e6
      },
      { rank: 3, name: "Lapangan Terbang Antarabangsa Penang", visitors: 8e6 },
      { rank: 4, name: "Lapangan Terbang Antarabangsa Kuching", visitors: 55e5 },
      {
        rank: 5,
        name: "Lapangan Terbang Antarabangsa Langkawi",
        visitors: 3e6
      }
    ]);
    const quickSummary = ref([
      { title: "Jumlah Pelawat", value: "10.5 Juta", icon: "ic:outline-people" },
      {
        title: "Pendapatan Pelancongan",
        value: "RM 86.14 Bilion",
        icon: "ic:outline-attach-money"
      },
      {
        title: "Tempoh Penginapan Purata",
        value: "6.1 Hari",
        icon: "ic:outline-hotel"
      },
      {
        title: "Kepuasan Pelancong",
        value: "92%",
        icon: "ic:outline-sentiment-satisfied"
      }
    ]);
    const visitorData = ref([
      {
        name: "Pelawat Tempatan",
        data: [5e6, 55e5, 6e6, 65e5, 7e6, 75e5]
      },
      {
        name: "Pelawat Asing",
        data: [3e6, 35e5, 4e6, 45e5, 5e6, 55e5]
      }
    ]);
    const foreignVisitorsByState = ref([
      { state: "Selangor", visitors: 15e5 },
      { state: "Pulau Pinang", visitors: 12e5 },
      { state: "Johor", visitors: 1e6 },
      { state: "Sabah", visitors: 8e5 },
      { state: "Sarawak", visitors: 6e5 },
      { state: "Melaka", visitors: 5e5 },
      { state: "Kedah", visitors: 4e5 },
      { state: "Negeri Sembilan", visitors: 3e5 },
      { state: "Perak", visitors: 25e4 },
      { state: "Terengganu", visitors: 2e5 },
      { state: "Kelantan", visitors: 15e4 },
      { state: "Pahang", visitors: 1e5 },
      { state: "Perlis", visitors: 5e4 }
    ]);
    const departureData = ref([
      { airport: "JFK", departures: 1500 },
      { airport: "LHR", departures: 1200 },
      { airport: "CDG", departures: 1e3 },
      { airport: "DXB", departures: 800 },
      { airport: "SIN", departures: 600 }
    ]);
    const repeatVisitorsData = ref([
      { category: "1-2 kali", percentage: 45 },
      { category: "3-5 kali", percentage: 30 },
      { category: "6-10 kali", percentage: 15 },
      { category: ">10 kali", percentage: 10 }
    ]);
    const topVisitorCountries = ref([
      { country: "Singapura", visitors: 15e5 },
      { country: "Indonesia", visitors: 12e5 },
      { country: "China", visitors: 1e6 },
      { country: "Thailand", visitors: 8e5 },
      { country: "India", visitors: 6e5 }
    ]);
    const chartOptionsVisitors = computed(() => ({
      chart: { height: 350, type: "line" },
      stroke: { curve: "smooth", width: 2 },
      xaxis: { categories: ["2018", "2019", "2020", "2021", "2022", "2023"] },
      yaxis: { title: { text: "Bilangan Pelawat" } }
    }));
    const chartOptionsForeignVisitors = computed(() => ({
      chart: { type: "bar" },
      plotOptions: { bar: { horizontal: true } },
      xaxis: { categories: foreignVisitorsByState.value.map((item) => item.state) }
    }));
    computed(() => ({
      chart: { type: "bar" },
      plotOptions: { bar: { horizontal: true } },
      xaxis: { categories: departureData.value.map((item) => item.airport) }
    }));
    const chartOptionsRepeatVisitors = computed(() => ({
      chart: { type: "pie" },
      labels: repeatVisitorsData.value.map((item) => item.category),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }));
    const chartOptionsTopCountries = computed(() => ({
      chart: { type: "bar" },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" }
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: topVisitorCountries.value.map((item) => item.country) },
      yaxis: { title: { text: "Bilangan Pelawat" } },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: function(val) {
            return val.toLocaleString() + " pelawat";
          }
        }
      }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutsBreadcrumb = __nuxt_component_0;
      const _component_rs_card = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1$1;
      const _component_client_only = __nuxt_component_0$2;
      const _component_VueApexCharts = resolveComponent("VueApexCharts");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_LayoutsBreadcrumb, null, null, _parent));
      _push(`<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(unref(quickSummary), (item, index) => {
        _push(ssrRenderComponent(_component_rs_card, {
          key: index,
          class: "transition-all duration-300 hover:shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="pt-5 pb-3 px-5 flex items-center gap-4"${_scopeId}><div class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl transition-all duration-300 hover:bg-primary/30"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                class: "text-primary text-3xl",
                name: item.icon
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex-1 truncate"${_scopeId}><span class="block font-bold text-2xl leading-tight text-primary"${_scopeId}>${ssrInterpolate(item.value)}</span><span class="text-sm font-medium text-gray-600"${_scopeId}>${ssrInterpolate(item.title)}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "pt-5 pb-3 px-5 flex items-center gap-4" }, [
                  createVNode("div", { class: "p-5 flex justify-center items-center bg-primary/20 rounded-2xl transition-all duration-300 hover:bg-primary/30" }, [
                    createVNode(_component_Icon, {
                      class: "text-primary text-3xl",
                      name: item.icon
                    }, null, 8, ["name"])
                  ]),
                  createVNode("div", { class: "flex-1 truncate" }, [
                    createVNode("span", { class: "block font-bold text-2xl leading-tight text-primary" }, toDisplayString(item.value), 1),
                    createVNode("span", { class: "text-sm font-medium text-gray-600" }, toDisplayString(item.title), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">`);
      _push(ssrRenderComponent(_component_rs_card, { class: "col-span-1 lg:col-span-2" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-bold text-primary"${_scopeId}> Gambaran Keseluruhan Pelawat </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-bold text-primary" }, " Gambaran Keseluruhan Pelawat ")
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(_component_VueApexCharts, {
                    width: "100%",
                    height: "350",
                    type: "line",
                    options: unref(chartOptionsVisitors),
                    series: unref(visitorData)
                  }, null, 8, ["options", "series"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold text-primary"${_scopeId}> Pelawat Asing mengikut Negeri </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold text-primary" }, " Pelawat Asing mengikut Negeri ")
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(_component_VueApexCharts, {
                    width: "100%",
                    height: "300",
                    type: "bar",
                    options: unref(chartOptionsForeignVisitors),
                    series: [
                      { data: unref(foreignVisitorsByState).map((item) => item.visitors) }
                    ]
                  }, null, 8, ["options", "series"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-lg font-semibold text-primary"${_scopeId}> Kekerapan Lawatan Pelancong </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-lg font-semibold text-primary" }, " Kekerapan Lawatan Pelancong ")
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(_component_VueApexCharts, {
                    width: "100%",
                    height: "300",
                    type: "pie",
                    options: unref(chartOptionsRepeatVisitors),
                    series: unref(repeatVisitorsData).map((item) => item.percentage)
                  }, null, 8, ["options", "series"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-bold text-primary"${_scopeId}> Negara Asal Pelancong Asing Teratas </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-bold text-primary" }, " Negara Asal Pelancong Asing Teratas ")
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(_component_VueApexCharts, {
                    width: "100%",
                    height: "350",
                    type: "bar",
                    options: unref(chartOptionsTopCountries),
                    series: [
                      {
                        name: "Pelawat",
                        data: unref(topVisitorCountries).map((item) => item.visitors)
                      }
                    ]
                  }, null, 8, ["options", "series"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_rs_card, { class: "mb-6" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-bold text-primary"${_scopeId}> Lapangan Terbang Teratas dengan Pelawat Terbanyak </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-bold text-primary" }, " Lapangan Terbang Teratas dengan Pelawat Terbanyak ")
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Kedudukan </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Nama Lapangan Terbang </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Jumlah Pelawat </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(unref(topAirports), (airport) => {
              _push2(`<tr class="hover:bg-gray-50 transition-colors duration-200"${_scopeId}><td class="px-6 py-4 whitespace-nowrap font-medium"${_scopeId}>${ssrInterpolate(airport.rank)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>${ssrInterpolate(airport.name)}</td><td class="px-6 py-4 whitespace-nowrap font-semibold text-primary"${_scopeId}>${ssrInterpolate(airport.visitors.toLocaleString())}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                  createVNode("thead", { class: "bg-gray-50" }, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Kedudukan "),
                      createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nama Lapangan Terbang "),
                      createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Jumlah Pelawat ")
                    ])
                  ]),
                  createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(topAirports), (airport) => {
                      return openBlock(), createBlock("tr", {
                        key: airport.rank,
                        class: "hover:bg-gray-50 transition-colors duration-200"
                      }, [
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap font-medium" }, toDisplayString(airport.rank), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, toDisplayString(airport.name), 1),
                        createVNode("td", { class: "px-6 py-4 whitespace-nowrap font-semibold text-primary" }, toDisplayString(airport.visitors.toLocaleString()), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-b7d9b4a4.mjs.map
