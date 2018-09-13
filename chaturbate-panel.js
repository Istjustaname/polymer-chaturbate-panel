import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';

class ChaturbatePanel extends PolymerElement {
  static get template() {
    return html `
      <style>
        :host {
          --cb-info-color: #fff;
          --cb-chat-text-shadow-color: rgba(0, 0, 0, 0.65);
          --cb-default-background-color: rgba(0,0,0,0.5);
        }

        .panel {
          color: var(--cb-info-color);
          background-color: var(--cb-default-background-color);
          text-shadow: -1px 0 var(--cb-chat-text-shadow-color),
                       0 1px var(--cb-chat-text-shadow-color),
                       1px 0 var(--cb-chat-text-shadow-color),
                       0 -1px var(--cb-chat-text-shadow-color);
          display: inline-table;
          padding: 8px;
          border-radius: 4px;
        }

        .label {
          font-weight: bold;
        }
    </style>

    <template is="dom-if" if="{{populated}}">
      <div class="panel">
        <template is="dom-repeat" items="{{panel}}">
          <div>
            <template is="dom-if" if="{{item.label}}">
              <span class="label">{{item.label}}</span>:&nbsp;
            </template>
            <span>{{item.value}}</span>
          </div>
        </template>
      </div>
    </template>`
  }

  static get properties() {
    return {
      panel: {
        type: Array,
        value: []
      },
      populated: {
        type: Boolean,
        value: false,
        computed: '_isPopulated(panel)'
      }
    }
  }

  _isPopulated(panel) {
    if (!panel) return false;
    if (!panel.length) return false;

    return panel.some((p) => {
      return p.label.length || p.value.length;
    });
  }
}

customElements.define('chaturbate-panel', ChaturbatePanel);
