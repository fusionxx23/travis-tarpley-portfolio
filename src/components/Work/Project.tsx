import { VsTerminalCmd } from "solid-icons/vs";
import LinkHoc from "./LinkHoc";
interface Props {
  title: string;
  icons: any[];
  desc: string;
  link?: string;
  github?: string;
  multiplier: number;
}
export function Project({ link }: Props) {
  <LinkHoc link="">
    <div
      class={` flex justify-center transition-all duration-150 cursor-pointer`}
    >
      <section class="w-full flex flex-col justify-start h-full p-4 sm:p-6">
        <div>
          <div class="flex justify-between">
            <VsTerminalCmd size={20} class="text-white hover:text-light-100" />
            <div class="text-light-200 flex">
              {link && (
                <Link rel="noopener noreferrer" target="_blank" href={link}>
                  <GoLinkExternal
                    class="cursor-pointer mx-1 hover:text-light-100"
                    size={20}
                  />
                </Link>
              )}
              {github && (
                <Link rel="noopener noreferrer" target="_blank" href={github}>
                  <FiGithub
                    class="cursor-pointer ml-1 hover:text-light-100"
                    size={20}
                  />
                </Link>
              )}
            </div>
          </div>
          <h1 class="text-light-200 mt-4 text-2xl font-chivo hover:text-light-100">
            {title}
          </h1>
        </div>

        <div class="flex justify-center">
          <div class="mt-4 relative cursor-pointer">
            {/* Purple BG */}
            <div
              onMouseOver={() => {
                setImgHover(true);
              }}
              onMouseLeave={() => {
                setImgHover(false);
              }}
              class="absolute transition-all z-10 ease-in h-full w-full hover:bg-transparent bg-light-100 bg-opacity-40 rounded-md"
            ></div>
            <Image
              class="rounded-md z-0 transition-all ease-in"
              src={img}
              alt={title}
              style={{ filter: `${imageHover ? "" : "grayscale(100%)"}` }}
            />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="font-chivo text-light-300 text-sm mt-1">
            <p>{desc}</p>
          </div>
          <div class="flex">
            {icons.map((I, i) => (
              <I class="text-light-200 m-2" size={20} key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  </LinkHoc>;
}
