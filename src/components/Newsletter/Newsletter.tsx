import React, {useState, useEffect} from 'react'


export default function Newsletter() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasShownModal = sessionStorage.getItem("hasSeenNewsletterPopup");

    if (!hasShownModal) {
      setShowModal(true);
      sessionStorage.setItem("hasSeenNewsletterPopup", "true");
    }
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [showModal]);

  if (!showModal) return null;
 

  return (
    <main className="fixed z-10 translate-y-50 inset-0 flex items-center justify-center xl:top-22 top-32 ">
        <div className="w-96 bg-zinc-200 p-5 flex flex-col justify-center gap-10 text-sm  ">
           <div className="flex justify-end button">
            <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="size-6 hover:rotate-45 transition-transform duration-300 w-10 h-10 cursor-pointer"
                  onClick={() => setShowModal(false)}
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
           </div>

          <div className="">
           <h1 className="text-xl items-center">Join the RVS community</h1>
           <p>Be the first to know about exclusive drops, restocks and special offers - straight to your inbox</p>
          </div>
           

            <div className="flex flex-col gap-4">
           <input 
            type="name"
            placeholder='Full Name'
            className="p-2 border border-zinc-400 rounded-md"
           />
           <input 
            type="email"
            placeholder='Email Address'
            className="p-2 border border-zinc-400 rounded-md"
           />
           </div>

           <form className="flex flex-col  gap-4">
           <div className="flex justify-start gap-2">
                <input
                type="checkbox"
                id="continueUpdate"
                name="continueUpdate"
                value="continueUpdate"
                />
                <label htmlFor="continueUpdate">
                Keep me updated with the latest news and best offers
                </label>
            </div>
            <div className="flex justify-start gap-2">
                <input
                type="checkbox"
                id="privacyPolicyAgreement"
                name="privacyPolicyAgreement"
                value="privacyPolicyAgreed"
                />
                <label htmlFor="privacyPolicyAgreement">
                I agree to the Privacy Policy and Cookie Policy
                </label>
            </div>
           </form>

           <button className="text-xl">Subscribe</button>
        </div>
    </main>
  )
}
