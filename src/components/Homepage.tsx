import { useState } from "preact/hooks";
import type { TestcardConfig, AspectRatio } from "../types/testcard";
import { DEFAULT_CONFIG } from "../types/testcard";
import { TestcardRenderer } from "./TestcardRenderer";

export function Homepage() {
  const [config, setConfig] = useState<TestcardConfig>(DEFAULT_CONFIG);

  const updateConfig = (updates: Partial<TestcardConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const generateTestcardUrl = () => {
    const params = new URLSearchParams();
    params.set("aspectRatio", config.aspectRatio);
    if (config.text) params.set("text", config.text);
    params.set("textColor", config.textColor.replace("#", ""));
    params.set("showTime", config.showTime.toString());
    params.set("showDate", config.showDate.toString());
    params.set("showBox", config.showBox.toString());

    return `/testcard.html?${params.toString()}`;
  };

  const openTestcard = () => {
    window.open(generateTestcardUrl(), "_blank");
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>Testcard Generator</h1>
        <p>Create custom testcards with SMPTE patterns and overlays</p>
      </header>

      <div className="main-content">
        <div className="controls-panel">
          <h2>Customize Your Testcard</h2>

          <div className="control-group">
            <label htmlFor="aspectRatio">Aspect Ratio:</label>
            <select
              id="aspectRatio"
              value={config.aspectRatio}
              onChange={(e) =>
                updateConfig({
                  aspectRatio: (e.target as HTMLSelectElement)
                    .value as AspectRatio,
                })
              }
            >
              <option value="16:9">16:9</option>
              <option value="4:3">4:3</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="text">Custom Text:</label>
            <input
              id="text"
              type="text"
              value={config.text || ""}
              onChange={(e) =>
                updateConfig({
                  text: (e.target as HTMLInputElement).value || undefined,
                })
              }
              placeholder="Enter custom text..."
            />
          </div>

          <div className="control-group">
            <label htmlFor="textColor">Text Color:</label>
            <input
              id="textColor"
              type="color"
              value={config.textColor}
              onChange={(e) =>
                updateConfig({
                  textColor: (e.target as HTMLInputElement).value,
                })
              }
            />
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={config.showTime}
                onChange={(e) =>
                  updateConfig({
                    showTime: (e.target as HTMLInputElement).checked,
                  })
                }
              />
              Show Time (HH:MM:SS)
            </label>
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={config.showDate}
                onChange={(e) =>
                  updateConfig({
                    showDate: (e.target as HTMLInputElement).checked,
                  })
                }
              />
              Show Date (YYYY-MM-DD)
            </label>
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={config.showBox}
                onChange={(e) =>
                  updateConfig({
                    showBox: (e.target as HTMLInputElement).checked,
                  })
                }
              />
              Show Text Box Background
            </label>
          </div>

          <div className="action-buttons">
            <button onClick={openTestcard} className="primary-button">
              Open Full Testcard
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  window.location.origin + generateTestcardUrl()
                )
              }
              className="secondary-button"
            >
              Copy URL
            </button>
          </div>
        </div>

        <div className="preview-panel">
          <h2>Preview</h2>
          <div className="preview-container">
            <TestcardRenderer
              config={config}
              dimensions={{
                width: 640,
                height: config.aspectRatio === "16:9" ? 360 : 480,
              }}
              className="preview-canvas"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
