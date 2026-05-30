<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    trigger,
    overlay,
    triggerStyle = "",
    onStateChange,
  }: {
    trigger?: Snippet<[{ isOpen: boolean }]>
    overlay?: Snippet<[{ close: () => void }]>
    triggerStyle?: string
    onStateChange?: (isOpen: boolean) => void
  } = $props()

  let isOpen = $state(false)

  function setOpen(value: boolean) {
    isOpen = value
    onStateChange?.(isOpen)
  }

  function close() {
    setOpen(false)
  }
</script>

<span class="overlay-root">
  <button
    class="trigger"
    style={triggerStyle}
    onclick={() => setOpen(!isOpen)}
  >
    {@render trigger?.({ isOpen })}
  </button>
  {#if isOpen}
    <button class="backdrop" aria-label="Close overlay" onclick={close}></button>
    <div class="panel">
      {@render overlay?.({ close })}
    </div>
  {/if}
</span>

<style>
  .overlay-root {
    position: relative;
    display: inline-flex;
  }
  .trigger {
    all: unset;
    cursor: pointer;
  }
  .backdrop {
    all: unset;
    position: fixed;
    inset: 0;
    z-index: 50;
  }
  .panel {
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    z-index: 60;
    background: var(--bgMedium);
    border: 1px solid var(--bgLight);
    border-radius: 1rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  }
</style>
