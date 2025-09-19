// script.js

function createEventBus() {
  // state خصوصی داخل closure
  const events = {};

  return {
    on(event, handler) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(handler);
    },

    off(event, handler) {
      if (!events[event]) return;
      events[event] = events[event].filter(h => h !== handler);
    },

    emit(event, ...args) {
      if (!events[event]) return;
      events[event].slice().forEach(handler => handler(...args));
    },

    once(event, handler) {
      const wrapper = (...args) => {
        handler(...args);
        this.off(event, wrapper);
      };
      this.on(event, wrapper);
    }
  };
}


const bus = createEventBus();

function handler1(msg) { console.log("handler1:", msg); }
function handler2(msg) { console.log("handler2:", msg); }

bus.on("test", handler1);
bus.on("test", handler2);

console.log("Emit اول:");
bus.emit("test", "سلام!"); 


bus.off("test", handler1);

console.log("Emit دوم:");
bus.emit("test", "سلام دوباره!"); 


bus.once("onceEvent", msg => console.log("once:", msg));
console.log("Emit once اول:");
bus.emit("onceEvent", "یک بار اول"); 

console.log("Emit once دوم:");
bus.emit("onceEvent", "یک بار دوم"); 