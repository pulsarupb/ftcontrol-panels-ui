import type { DashboardComponent, Template } from "$lib/types"
import BatteryNavlet from "./BatteryNavlet.svelte"
import CameraWidget from "./CameraWidget.svelte"
import GamepadWidget from "./GamepadWidget.svelte"
import GraphWidget from "./GraphWidget.svelte"
import MapWidget from "./MapWidget.svelte"
import PowerWidget from "./PowerWidget.svelte"
import SignalNavlet from "./SignalNavlet.svelte"
import StatusNavlet from "./StatusNavlet.svelte"
import TelemetryWidget from "./TelemetryWidget.svelte"

export const components: DashboardComponent[] = [
  { id: "telemetry", name: "Telemetry", type: "widget", component: TelemetryWidget, minW: 3, minH: 3 },
  { id: "power", name: "Power", type: "widget", component: PowerWidget, minW: 3, minH: 3 },
  { id: "graph", name: "Graph", type: "widget", component: GraphWidget, minW: 4, minH: 3 },
  { id: "map", name: "Map", type: "widget", component: MapWidget, minW: 4, minH: 4 },
  { id: "camera", name: "Camera", type: "widget", component: CameraWidget, minW: 4, minH: 3 },
  { id: "gamepad", name: "Gamepad", type: "widget", component: GamepadWidget, minW: 5, minH: 4 },
  { id: "status", name: "Status", type: "navlet", component: StatusNavlet },
  { id: "battery", name: "Battery", type: "navlet", component: BatteryNavlet },
  { id: "signal", name: "Signal", type: "navlet", component: SignalNavlet },
]

export const templates: Template[] = [
  {
    name: "Rover Overview",
    navlets: [{ navletID: "status" }, { navletID: "battery" }, { navletID: "signal" }],
    widgets: [
      { x: 0, y: 0, w: 5, h: 4, widgets: [{ widgetID: "telemetry" }] },
      { x: 5, y: 0, w: 4, h: 4, widgets: [{ widgetID: "power" }] },
      { x: 9, y: 0, w: 7, h: 6, widgets: [{ widgetID: "map" }] },
      { x: 0, y: 4, w: 5, h: 4, widgets: [{ widgetID: "gamepad" }] },
      { x: 5, y: 4, w: 4, h: 4, widgets: [{ widgetID: "graph" }] },
      { x: 9, y: 6, w: 7, h: 6, widgets: [{ widgetID: "camera" }] },
    ],
  },
  {
    name: "Driving Focus",
    navlets: [{ navletID: "status" }, { navletID: "signal" }],
    widgets: [
      { x: 0, y: 0, w: 8, h: 6, widgets: [{ widgetID: "gamepad" }] },
      { x: 8, y: 0, w: 8, h: 6, widgets: [{ widgetID: "camera" }] },
      { x: 0, y: 6, w: 5, h: 6, widgets: [{ widgetID: "power" }] },
      { x: 5, y: 6, w: 6, h: 6, widgets: [{ widgetID: "telemetry" }] },
      { x: 11, y: 6, w: 5, h: 6, widgets: [{ widgetID: "graph" }] },
    ],
  },
]

export function getComponent(id: string, type?: "widget" | "navlet") {
  return components.find((component) => component.id === id && (!type || component.type === type))
}

export function getComponents(type: "widget" | "navlet") {
  return components.filter((component) => component.type === type)
}
