
export default function News() {
  return (
    <main className='p-8 pt-12 bg-(--primary-bg-color) md:pt-20'>
        <h2 className='text-(--primary-text-color) text-4xl my-4 font-extrabold'>News</h2>
          <div className="text-(--primary-text-color)">
              <div className="my-4 ">
                  <h4 className="text-2xl font-bold">Important: DinoFitClub is currently in Beta</h4>
                  <span className="text-sm">Publish:- 1/09/2026</span>
              </div>             
              <p>Welcome to the DinoFitClub Beta! From September 1, 2026 to October 10, 2026, we’re testing and improving the platform with the help of our early users.
                <br />
                  During this Beta period, your data may be reset or removed after testing is completed. Please avoid using the Beta environment to store important or permanent information.
                  <br />
                  <br />
                  As a Beta user, you’re also part of our testing community. 💚 Explore the platform, try out its features, and let us know if you find any bugs, problems, or areas that could be improved.
                  <br />
                  <br />
                  <span className="font-bold">Your feedback helps us make DinoFitClub better. </span>
                   If you find an issue, please report it through our Support section.
                  <br />
                  Thank you for being part of the journey!</p>
          </div>
    </main>
  )
}
