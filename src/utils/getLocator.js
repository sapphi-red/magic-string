export default function getLocator(source) {
	const lineOffsets = [0];

	let lineBreakPos = -1;
	while ((lineBreakPos = source.indexOf('\n', lineBreakPos+1)) !== -1) {
		lineOffsets.push(lineBreakPos + 1);
	}

	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		while (i < j) {
			const m = (i + j) >> 1;
			if (index < lineOffsets[m]) {
				j = m;
			} else {
				i = m + 1;
			}
		}
		const line = i - 1;
		const column = index - lineOffsets[line];
		return { line, column };
	};
}
