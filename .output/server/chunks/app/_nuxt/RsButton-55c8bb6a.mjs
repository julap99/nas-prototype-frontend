import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "RsButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "fill"
    },
    variant: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
    },
    btnType: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["button", {
          "button-sm": __props.size === "sm",
          "button-md": __props.size === "md",
          "button-lg": __props.size === "lg",
          // Filled Button
          "button-primary": __props.variant === "primary",
          "button-secondary": __props.variant === "secondary",
          "button-info": __props.variant === "info",
          "button-success": __props.variant === "success",
          "button-warning": __props.variant === "warning",
          "button-danger": __props.variant === "danger",
          // Outline Button
          "outline-primary": __props.variant === "primary-outline",
          "outline-secondary": __props.variant === "secondary-outline",
          "outline-info": __props.variant === "info-outline",
          "outline-success": __props.variant === "success-outline",
          "outline-warning": __props.variant === "warning-outline",
          "outline-danger": __props.variant === "danger-outline",
          //Text Button
          "texts-primary": __props.variant === "primary-text",
          "texts-secondary": __props.variant === "secondary-text",
          "texts-info": __props.variant === "info-text",
          "texts-success": __props.variant === "success-text",
          "texts-warning": __props.variant === "warning-text",
          "texts-danger": __props.variant === "danger-text"
        }],
        type: __props.btnType
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RsButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main;

export { __nuxt_component_0 as _ };
//# sourceMappingURL=RsButton-55c8bb6a.mjs.map
