class FileElement<E>{
    element: E;
    name: string;
    constructor(element: E, name: string) {
        this.element = element;
        this.name = name;
    }
}

export default FileElement;