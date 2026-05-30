<script lang="ts">
  import { onMount, setContext, tick } from "svelte"
  import html2canvas from "html2canvas"
  import Layout from "./Layout.svelte"
import { Manager } from "./widgets.svelte"
import type { Template } from "$lib/types"
import { global } from "$lib"
import Topbar from "$lib/Topbar.svelte"

  let { t }: { t: Template } = $props()

  const cacheKey = $derived(`${t.name}:${JSON.stringify(t)}`)

  let m = $state(new Manager({ name: "Preview", widgets: [], navlets: [] }))
  let targetElement: HTMLDivElement
  let imageDataUrl: string = $state("")

  setContext("manager", () => m)

  async function renderAsImage() {
    if (!targetElement) return

    const renderedCanvas = await html2canvas(targetElement, {
      backgroundColor: null,
    })

    imageDataUrl = renderedCanvas.toDataURL("image/png")
    targetElement.remove()

    global.templatePreviews[cacheKey] = imageDataUrl
  }

  async function waitForStableRender(ticks = 3) {
    for (let i = 0; i < ticks; i++) {
      await tick()
    }
  }

  onMount(async () => {
    m = new Manager(t)
    m.loadPreview(t)
    await waitForStableRender(6)
    await renderAsImage()
  })
</script>

<div
  bind:this={targetElement}
  class="capture-target"
>
  <section class="preview-shell">
    <Topbar />
    <Layout bind:manager={m} enableInteractions={false} preview={true} />
  </section>
</div>

<style>
  .preview-shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: var(--bgDark);
  }
  .capture-target {
    position: fixed;
    left: 0;
    top: 0;
    width: 1600px;
    height: 900px;
    z-index: -1000;
    pointer-events: none;
  }
</style>
