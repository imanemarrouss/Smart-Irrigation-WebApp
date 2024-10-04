import { Skia } from "../skia";
import { JsiDrawingContext } from "../dom/types/DrawingContext";
import { SkiaBaseWebView } from "./SkiaBaseWebView";
export class SkiaDomView extends SkiaBaseWebView {
  constructor(props) {
    super(props);
  }
  renderInCanvas(canvas, touches) {
    if (this.props.onTouch) {
      console.warn(`The onTouch property is deprecated and will be removed in the next Skia release.
See: https://shopify.github.io/react-native-skia/docs/animations/gestures`);
      this.props.onTouch([touches]);
    }
    if (this.props.onSize) {
      const {
        width,
        height
      } = this.getSize();
      this.props.onSize.value = {
        width,
        height
      };
    }
    if (this.props.root) {
      const ctx = new JsiDrawingContext(Skia, canvas);
      this.props.root.render(ctx);
    }
  }
}
//# sourceMappingURL=SkiaDomView.web.js.map