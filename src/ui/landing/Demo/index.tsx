import demo from "../../../../assets/demo.png";
import Image from "next/image";

export default function Demo() {
  return (
    <div className="mt-4">
      <Image
        src={demo}
        width={946}
        height={480}
        alt="Satcom Demo"
      />
    </div>
  );
}
