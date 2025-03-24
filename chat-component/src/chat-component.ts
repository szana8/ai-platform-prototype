import { defineCustomElement } from 'vue'
import ChatWidget from './ChatWidget.ce.vue'

const ChatWidgetElement = defineCustomElement(ChatWidget)

customElements.define('chat-widget', ChatWidgetElement)