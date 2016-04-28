/*global self*/
import diff from 'virtual-dom/diff'
import fromJson from 'vdom-as-json/fromJson'
import serializePatch from 'vdom-serialized-patch/serialize'
import app from './views/app'
import handlers from './handlers'

let currentVDom
let state = {
  count: 0,
  render: () => {
    patchDom()
  },
  trigger: function(data) {
    handleMessage({data: data})
  }
}

const patchDom = () => {
  const newVDom = app(state)
  const patches = diff(currentVDom, newVDom)  // do the diff

  currentVDom = newVDom
  // send patches and current url back to the main thread
  self.postMessage({url: state.url, payload: serializePatch(patches)})
}

const handleMessage = ({data}) => {
  const {type, payload} = data
  switch(type) {
    case 'start': startApp(payload); break
    default: handlers(state, type, payload)
  }
  patchDom()
}

self.onmessage = handleMessage

const startApp = ({url, virtualDom}) => {
  state.url = url
  currentVDom = fromJson(virtualDom)
}
