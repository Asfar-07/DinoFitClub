import "./loader.css"

export default function EnterLoader() {
  return (
    <div className='fixed flex justify-center items-center inset-0 bg-[#0a0f22] z-500'>
      <section className="relative h-50 w-80">
        <div className="relative z-5 size-full">
            <img src="/images/loading/car_driving.webp" alt="car driving" className="size-full"/>
        </div>
        <div className="car-tyre absolute z-10 bottom-[16%] left-[24%] size-14 animate-spin">
            <img src="/images/loading/car_tyre.webp" alt="car tyre" className="size-full"/>
        </div>
        <div className="car-tyre absolute z-10 bottom-[16%] right-[16%] size-14 animate-spin">
            <img src="/images/loading/car_tyre.webp" alt="car tyre" className="size-full"/>
        </div>
        <div className="absolute z-2 bottom-[11%] left-[15%] bg-[#5f5e5e2f] w-[80%] h-6 rounded-[50%] rotate-x-60 ">
        </div>
        <div className="absolute z-2 bottom-[26%] left-[18%] size-2">
            <div className="size-full absolute car-smoke">
                <img src="/images/loading/smoke.webp" alt="smoke" />
            </div>
            <div className="size-full absolute car-smoke delay-100">
                <img src="/images/loading/smoke.webp" alt="smoke" />
            </div>
            <div className="size-full absolute car-smoke delay-200">
                <img src="/images/loading/smoke.webp" alt="smoke" />
            </div>
        </div>
      </section>
    </div>
  )
}
