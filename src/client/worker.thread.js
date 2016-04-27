/*global self*/
import diff from 'virtual-dom/diff'
import fromJson from 'vdom-as-json/fromJson'
import serializePatch from 'vdom-serialized-patch/serialize'
import app from './views/app'

let currentVDom
let state = {
  count: 0}

self.onmessage = ({data}) => {
  const {type, payload} = data

  switch(type) {
    case 'start': startApp(payload)
      break
    case 'increment':
      state.count++
      break
    case 'decrement':
      state.count--
      break
    case 'setUrl':
      state.url = payload
      break}

  patchDom()}

const startApp = ({url, virtualDom}) => {
  state.url = url
  currentVDom = fromJson(virtualDom)}

const patchDom = () => {
  const newVDom = app(state)
  const patches = diff(currentVDom, newVDom)  // do the diff

  currentVDom = newVDom
  // send patches and current url back to the main thread
  self.postMessage({url: state.url, payload: serializePatch(patches)})}
