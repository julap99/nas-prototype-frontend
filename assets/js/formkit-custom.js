import { createInput } from "@formkit/vue";
import OneTimePassword from "~/components/formkit/OneTimePassword.vue";
import MaskText from "~/components/formkit/TextMask.vue";
import FileDropzone from "~/components/formkit/FileDropzone.vue";
import Switch from "~/components/formkit/Switch.vue";
import SearchSelect from "~/components/formkit/SearchSelect.vue";
import CustomHtml from "~/components/formkit/CustomHtml.vue";
import CustomFileUpload from "~/components/formkit/CustomFileUpload.vue";
import QuillEditor from "~/components/formkit/QuillEditor.vue";

export default {
  otp: createInput(OneTimePassword, {
    props: ["digits"],
  }),
  mask: createInput(MaskText, {
    props: ["mask"],
  }),
  dropzone: createInput(FileDropzone, {
    props: ["accept", "multiple", "maxSize", "minSize", "maxFiles", "disabled"],
  }),
  switch: createInput(Switch, {
    props: ["value", "disabled", "name", "id"],
  }),
  searchSelect: createInput(SearchSelect, {
    props: ["options", "placeholder"],
  }),
  customHtml: createInput(CustomHtml, {
    props: ["htmlContent", "cssContent", "jsContent", "allowScripts", "previewMode", "showInPreview"],
  }),
  customFileUpload: createInput(CustomFileUpload, {
    props: ["accept", "multiple", "maxSize", "maxFiles", "buttonLabel", "dropzoneText", "showRestrictions", "allowDownload", "uploadedFilesText", "showFileCount"],
  }),
  quillEditor: createInput(QuillEditor, {
    props: ["placeholder", "toolbar", "theme", "contentType"],
  }),
};
