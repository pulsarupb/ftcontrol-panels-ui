<script lang="ts">
  import type { Template } from "$lib/types"
  import { global } from "$lib"

  import CanvasRenderLoader from "./CanvasRenderLoader.svelte"

  let {
    t,
    show = true,
  }: { t: Template; show?: boolean } = $props()

  const cacheKey = $derived(t.name)

  let imageDataUrl: string | undefined = $derived(
    global.templatePreviews[cacheKey]
  )
</script>

{#if imageDataUrl != undefined}
  {#if show}
    <img src={imageDataUrl} alt="Rendered Component" />
  {/if}
{:else}
  {#if show}
    <div class="preview-loading">Generating preview…</div>
  {/if}
  <CanvasRenderLoader {t} />
{/if}

<style>
  img {
    width: 100%;
    height: auto;
  }
</style>
