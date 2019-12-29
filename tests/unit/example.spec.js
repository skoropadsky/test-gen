import { expect } from "chai";
import { mount } from "@vue/test-utils";
import store from "@/store";
import Table from "@/components/Table.vue";

describe("Table.vue", () => {
    it("renders a table", () => {
        const wrapper = mount(Table, { store });
        expect(wrapper.contains('table')).to.equal(true);
    });

    it("renders a form", () => {
        const wrapper = mount(Table, { store });
        expect(wrapper.contains('form')).to.equal(true);
    });
});

