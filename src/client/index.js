import WorkerThread from 'worker!./worker.thread.js'
import applyPatch from 'vdom-serialized-patch/patch'
import virtualize from 'vdom-virtualize'
import toJson from 'vdom-as-json/toJson'
import {getLocalPathname} from 'local-links'
import app from './views/app'

require('./styles/index.css')
require('basscss/css/basscss.css')
require('basscss-btn/css/btn.css')
require('basscss-lighten/css/lighten.css')
require('basscss-colors/css/colors.css')
require('basscss-background-colors/css/background-colors.css')

const rootElement = document.createElement('main')

// Create an instance of our worker. The actual loading of the script gets handled
// by webpack's worker-loader: https://www.npmjs.com/package/worker-loader
const worker = new WorkerThread()

// any time we get a message from the worker it will be a set of "patches" to apply to
// the real DOM. We do this on a requestAnimationFrame for minimal impact
const renderDomChanges = ({url, payload}) => {
  requestAnimationFrame(() => {
    applyPatch(rootElement, payload)})}

// we only want to update the URL if it's different than the current
// URL. Otherwise we keep pushing the same url to the history with each render
const updateUrl = ({url}) => {
  if(location.pathname !== url) {
    history.pushState(null, null, url)}}

const handleWorkerMessages = () => {
  worker.onmessage = ({data}) => {
    renderDomChanges(data)
    updateUrl(data)}}

// we start things off by sending a virtual DOM representation of the *real* DOM
// along with the current URL to our worker
const startDomRendering = () => {
  document.body.appendChild(rootElement)
  worker.postMessage({
    type: 'start',
    payload: {
      virtualDom: toJson(virtualize(rootElement)),
      url: location.pathname}})}

// if the user hits the back/forward buttons pass the new url to the worker
const handleBackAndForwardNavigation = () => {
  window.addEventListener('popstate', () => {
    worker.postMessage({type: 'setUrl', payload: location.pathname})})}

// listen for all clicks globally
const handleClicks = () => {
  document.body.addEventListener('click', (event) => {
    // handles internal navigation defined as clicks on <a> tags that have `href` that is
    // on the same origin. https://www.npmjs.com/package/local-links
    const pathname = getLocalPathname(event)

    if(pathname) {
      // stop browser from following the link
      event.preventDefault()
      // instead, post the new URL to our worker which will trigger compute a new vDom
      // based on that new URL state
      worker.postMessage({type: 'setUrl', payload: pathname})
    }

    // this is for other "onClick" type events we want to respond to. We check existance of an `data-click`
    // attribute and if it exists, post that back. In our case, the messages look like either
    // {type: "increment"} or {type: "decrement"}
    // but could contain any serializable payload describing the action that occured
    const click = event.target['data-click']

    if(click) {
      event.preventDefault()
      worker.postMessage(click)}})}

// initialization
handleWorkerMessages()
handleBackAndForwardNavigation()
handleClicks()
startDomRendering()
