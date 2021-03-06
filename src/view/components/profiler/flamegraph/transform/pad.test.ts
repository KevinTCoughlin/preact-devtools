import { expect } from "chai";
import { padNodes } from "./pad";
import { NodeTransform } from "./focusNode";

describe("FlameGraph", () => {
	describe("padNodes", () => {
		it("should pad flat tree", () => {
			const nodes: NodeTransform[] = [
				{ id: 1, row: 0, width: 100, x: 0 },
				{ id: 2, row: 1, width: 0, x: 75 },
			];
			expect(padNodes(nodes, 10)).to.deep.equal([
				{ id: 1, row: 0, width: 110, x: 0 },
				{ id: 2, row: 1, width: 10, x: 75 },
			]);
		});

		it("should pad following nodes", () => {
			const nodes: NodeTransform[] = [
				{ id: 1, row: 0, width: 100, x: 0 },
				{ id: 2, row: 1, width: 0, x: 25 },
				{ id: 3, row: 1, width: 10, x: 50 },
			];
			expect(padNodes(nodes, 10)).to.deep.equal([
				{ id: 1, row: 0, width: 110, x: 0 },
				{ id: 2, row: 1, width: 10, x: 25 },
				{ id: 3, row: 1, width: 10, x: 60 },
			]);
		});

		it("should pad parent following nodes", () => {
			const nodes: NodeTransform[] = [
				{ id: 1, row: 0, width: 100, x: 0 },
				{ id: 2, row: 1, width: 40, x: 25 },
				{ id: 3, row: 2, width: 0, x: 40 },
				{ id: 4, row: 1, width: 20, x: 70 },
			];
			expect(padNodes(nodes, 10)).to.deep.equal([
				{ id: 1, row: 0, width: 110, x: 0 },
				{ id: 2, row: 1, width: 50, x: 25 },
				{ id: 3, row: 2, width: 10, x: 40 },
				{ id: 4, row: 1, width: 20, x: 80 },
			]);
		});

		it("should pad zeroed nodes on the same location", () => {
			const nodes: NodeTransform[] = [
				{ id: 1, row: 0, width: 100, x: 0 },
				{ id: 2, row: 1, width: 0, x: 75 },
				{ id: 3, row: 1, width: 0, x: 75 },
			];
			expect(padNodes(nodes, 10)).to.deep.equal([
				{ id: 1, row: 0, width: 120, x: 0 },
				{ id: 2, row: 1, width: 10, x: 75 },
				{ id: 3, row: 1, width: 10, x: 85 },
			]);
		});

		it("should pad zeroed nodes on the same location #2", () => {
			const nodes: NodeTransform[] = [
				{ id: 1, row: 0, width: 100, x: 0 },
				{ id: 2, row: 1, width: 0, x: 75 },
				{ id: 3, row: 1, width: 0, x: 75 },
				{ id: 4, row: 1, width: 0, x: 75 },
				{ id: 5, row: 1, width: 15, x: 85 },
			];
			expect(padNodes(nodes, 10)).to.deep.equal([
				{ id: 1, row: 0, width: 130, x: 0 },
				{ id: 2, row: 1, width: 10, x: 75 },
				{ id: 3, row: 1, width: 10, x: 85 },
				{ id: 4, row: 1, width: 10, x: 95 },
				{ id: 5, row: 1, width: 15, x: 115 },
			]);
		});
	});
});
