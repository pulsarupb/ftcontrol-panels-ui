<script lang="ts">
  import Overlay from "$lib/ui/Overlay.svelte"
  import { rover } from "$lib/data/rover.svelte"

  type Stick = {
    x: number
    y: number
    value: boolean
  }

  type GamepadView = {
    l1: boolean
    l2: number
    r1: boolean
    r2: number
    leftStick: Stick
    rightStick: Stick
    cross: boolean
    circle: boolean
    square: boolean
    triangle: boolean
    dpad_up: boolean
    dpad_left: boolean
    dpad_right: boolean
    dpad_down: boolean
    touchpad: boolean
    options: boolean
    share: boolean
    ps: boolean
  }

  const emptyGamepad = (): GamepadView => ({
    l1: false,
    l2: 0,
    r1: false,
    r2: 0,
    leftStick: { x: 0, y: 0, value: false },
    rightStick: { x: 0, y: 0, value: false },
    cross: false,
    circle: false,
    square: false,
    triangle: false,
    dpad_up: false,
    dpad_left: false,
    dpad_right: false,
    dpad_down: false,
    touchpad: false,
    options: false,
    share: false,
    ps: false,
  })

  const gamepad = $derived.by<GamepadView>(() => {
    const buttons = rover.gamepadButtons
    const axes = rover.gamepadAxes
    if (!rover.gamepadConnected) return emptyGamepad()

    return {
      l1: buttons[4] ?? false,
      l2: buttons[6] ? 1 : 0,
      r1: buttons[5] ?? false,
      r2: buttons[7] ? 1 : 0,
      leftStick: {
        x: axes[0] ?? 0,
        y: axes[1] ?? 0,
        value: buttons[10] ?? false,
      },
      rightStick: {
        x: axes[2] ?? 0,
        y: axes[3] ?? 0,
        value: buttons[11] ?? false,
      },
      cross: buttons[0] ?? false,
      circle: buttons[1] ?? false,
      square: buttons[2] ?? false,
      triangle: buttons[3] ?? false,
      dpad_up: buttons[12] ?? false,
      dpad_down: buttons[13] ?? false,
      dpad_left: buttons[14] ?? false,
      dpad_right: buttons[15] ?? false,
      touchpad: buttons[17] ?? false,
      options: buttons[9] ?? false,
      share: buttons[8] ?? false,
      ps: buttons[16] ?? false,
    }
  })

  const gamepadsOptions = $derived.by(() => {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return [0, 1, 2, 3]
    const connected = Array.from(navigator.getGamepads())
      .map((pad, index) => (pad ? index : -1))
      .filter((index) => index >= 0)
    return connected.length ? connected : [0, 1, 2, 3]
  })

  function formatIndex(index: number): string {
    return `Gamepad ${index + 1}`
  }

  function boolValue(value: boolean) {
    return value ? 1 : 0
  }

  function analogValue(value: number) {
    return Math.max(0, Math.min(1, value))
  }

  function stickStyle(stick: Stick) {
    return `--offsetX:${stick.x};--offsetY:${stick.y};--value:${stick.value ? 1 : Math.max(Math.abs(stick.x), Math.abs(stick.y))};`
  }

  const activeTags = $derived.by(() => {
    const tags = []
    if (rover.gamepadConnected) tags.push("Physical")
    if (gamepad.l1) tags.push("L1")
    if (gamepad.l2 > 0) tags.push("L2")
    if (gamepad.r1) tags.push("R1")
    if (gamepad.r2 > 0) tags.push("R2")
    if (gamepad.dpad_left) tags.push("Left")
    if (gamepad.dpad_right) tags.push("Right")
    if (gamepad.dpad_up) tags.push("Up")
    if (gamepad.dpad_down) tags.push("Down")
    if (gamepad.circle) tags.push("Circle")
    if (gamepad.cross) tags.push("Cross")
    if (gamepad.triangle) tags.push("Triangle")
    if (gamepad.square) tags.push("Square")
    if (gamepad.share) tags.push("Share")
    if (gamepad.options) tags.push("Options")
    if (gamepad.ps) tags.push("PS")
    if (gamepad.touchpad) tags.push("Touchpad")
    if (gamepad.leftStick.value || Math.abs(gamepad.leftStick.x) > 0.1 || Math.abs(gamepad.leftStick.y) > 0.1) tags.push("L Stick")
    if (gamepad.rightStick.value || Math.abs(gamepad.rightStick.x) > 0.1 || Math.abs(gamepad.rightStick.y) > 0.1) tags.push("R Stick")
    return tags
  })
</script>

<section class="gamepad">
  <section class="top-overlay">
    <Overlay>
      {#snippet trigger()}
        <button class="item">{formatIndex(rover.gamepadIndex)}</button>
      {/snippet}
      {#snippet overlay({ close }: { close: () => void })}
        <div class="menu">
          {#each gamepadsOptions as option}
            <button
              class="item"
              onclick={() => {
                rover.setGamepadIndex(option)
                close()
              }}>{formatIndex(option)}</button
            >
          {/each}
        </div>
      {/snippet}
    </Overlay>
    <p>{rover.gamepadConnected ? rover.gamepadId : "Press a button on a connected gamepad"}</p>
  </section>

  <div class="drawing reversed">
    <img src="/gamepad-front.png" alt="Gamepad front" draggable="false" />
    <span class="button" aria-label="L1" style="--top:35%;--left:30.5%;--value:{boolValue(gamepad.l1)}"></span>
    <span class="button" aria-label="L2" style="--top:46.4%;--left:30.9%;--value:{analogValue(gamepad.l2)}"></span>
    <span class="button" aria-label="R1" style="--top:35%;--left:69.5%;--value:{boolValue(gamepad.r1)}"></span>
    <span class="button" aria-label="R2" style="--top:46.4%;--left:69.1%;--value:{analogValue(gamepad.r2)}"></span>
  </div>

  <div class="drawing normal">
    <img src="/gamepad-top.png" alt="Gamepad top" draggable="false" />
    <span class="button" style="--top:25.8%;--left:30%;--value:{boolValue(gamepad.dpad_up)}"></span>
    <span class="button" style="--top:36.9%;--left:30%;--value:{boolValue(gamepad.dpad_down)}"></span>
    <span class="button" style="--top:30.9%;--left:26.4%;--value:{boolValue(gamepad.dpad_left)}"></span>
    <span class="button" style="--top:30.9%;--left:33.4%;--value:{boolValue(gamepad.dpad_right)}"></span>

    <span class="button" style="--top:22.7%;--left:70%;--value:{boolValue(gamepad.triangle)}"></span>
    <span class="button" style="--top:39.8%;--left:70%;--value:{boolValue(gamepad.cross)}"></span>
    <span class="button" style="--top:31%;--left:74.8%;--value:{boolValue(gamepad.circle)}"></span>
    <span class="button" style="--top:31%;--left:65.3%;--value:{boolValue(gamepad.square)}"></span>

    <span class="button touchpad" style="--top:23.9%;--left:50%;--value:{boolValue(gamepad.touchpad)}"></span>
    <span class="button" style="--top:47.9%;--left:50%;--value:{boolValue(gamepad.ps)}"></span>
    <span class="button" style="--top:19.7%;--left:37%;--value:{boolValue(gamepad.share)}"></span>
    <span class="button" style="--top:19.7%;--left:63%;--value:{boolValue(gamepad.options)}"></span>

    <span class="button" style="--top:60%;--left:40%;--value:{boolValue(gamepad.leftStick.value)}"></span>
    <span class="button" style="--top:60%;--left:60%;--value:{boolValue(gamepad.rightStick.value)}"></span>
    <span class="stick" style="--top:45%;--left:40%;{stickStyle(gamepad.leftStick)}"></span>
    <span class="stick" style="--top:45%;--left:60%;{stickStyle(gamepad.rightStick)}"></span>
  </div>

  <section class="overlay">
    {#each activeTags as tag}
      <div>{tag}</div>
    {/each}
  </section>
</section>

<style>
  .gamepad {
    flex-grow: 1;
    min-width: 300px;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    --primary: var(--accent);
  }
  .drawing {
    position: relative;
    aspect-ratio: 1920 / 1080;
    height: auto;
  }
  .reversed {
    margin-bottom: -20%;
    margin-top: -15%;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
    user-select: none;
  }
  .button,
  .stick {
    --value: 0;
    position: absolute;
    top: var(--top);
    left: var(--left);
    background-color: var(--primary);
    transform: translateX(-50%);
    width: 4%;
    aspect-ratio: 1 / 1;
    border-radius: 69vw;
    opacity: calc(0.2 + var(--value) * 0.75);
    box-shadow: 0 0 calc(var(--value) * 28px) rgba(56, 189, 248, 0.75);
  }
  .touchpad {
    width: 12%;
    border-radius: 1rem;
    aspect-ratio: 3 / 1.5;
  }
  .stick {
    width: 6.5%;
    top: calc(var(--top) + var(--offsetY) * 12%);
    left: calc(var(--left) + var(--offsetX) * 12%);
  }
  .top-overlay {
    position: absolute;
    left: var(--padding);
    top: var(--padding);
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: calc(100% - 2 * var(--padding));
  }
  .top-overlay p {
    margin: 0;
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .menu {
    display: grid;
    gap: 0.35rem;
    padding: 0.5rem;
  }
  .item {
    all: unset;
    cursor: pointer;
    padding: 0.25em 0.5em;
    border: 1px solid currentColor;
    border-radius: 0.25rem;
    text-wrap: nowrap;
    background: var(--bgDark);
  }
  .overlay {
    position: absolute;
    left: var(--padding);
    right: var(--padding);
    bottom: var(--padding);
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--padding) / 2);
  }
  .overlay div {
    outline: 1px solid currentColor;
    background: rgba(11, 13, 13, 0.72);
    backdrop-filter: blur(8px);
    padding: 0.35em 0.6em;
    border-radius: 0.35rem;
  }
</style>
