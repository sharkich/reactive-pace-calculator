export class StringsHelper {
  static clearText(inputValue: string): string {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = inputValue;
    const text: string = div.textContent || div.innerText || '';
    return text.trim();
  }
}
