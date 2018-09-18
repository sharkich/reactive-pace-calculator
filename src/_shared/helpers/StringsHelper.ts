export class StringsHelper {
  static clearText(inputValue: string): string {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = inputValue;
    return div.textContent || div.innerText || '';
  }
}
