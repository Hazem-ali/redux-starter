import axios from "axios";
import { addBug, getUnresolvedBugs, resolveBug } from "../bugs";
import configureStore from "../configureStore";
import MockAdapter from "axios-mock-adapter";
describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    store = configureStore();
    fakeAxios = new MockAdapter(axios);
  });

  const createState = () => ({ entities: { bugs: { list: [] } } });

  it("Should add the bug to the store if it's added to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
  it("Should not add the bug to the store if it's not added to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(store.getState().entities.bugs.list).toHaveLength(0);
  });
  it("Should mark the given bug as resolved", async () => {
    // Arrange
    const bug = { description: "a" };
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    // Act
    await store.dispatch(addBug(bug));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(store.getState().entities.bugs.list[0].resolved).toEqual(true);
  });
  it("Should not mark the given bug as resolved", async () => {
    // Arrange
    const bug = { description: "a" };
    fakeAxios.onPatch("/bugs/1").reply(500, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    // Act
    await store.dispatch(addBug(bug));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(store.getState().entities.bugs.list[0].resolved).not.toEqual(true);
  });
  it("Should get bugs with resolved != true", async () => {
    // Arrange
    const state = createState();
    state.entities.bugs.list = [
      { id: 1, resolved: true },
      { id: 2 },
      { id: 3 },
    ];

    // Act
    const result = getUnresolvedBugs(state);

    // Assert
    expect(result).toHaveLength(2)
  });
});
