import Image from "next/image"

export const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()

    // TODO: Send email
    // const form = e.target

    // const name = form.name.value
    // const email = form.email.value
    // const message = form.message.value

    console.log('Send email feature is coming soon!')
  }

  return (
    <section id='contact' className='container contact'>
      <Image src='/images/bg-bottom-arrow-white.svg' alt="bg-bottom-arrow-white" width='100%' height={22} />

      <h1 className='title-container'>
        CONTACT
      </h1>

      <hr className='title-bar' />

      <form
        id='contact-form'
        className='contact__form'
        onSubmit={handleSubmit}
      >
        <span className='contact__send-me'>Send me a message (Coming soon)</span>

        <input id='name' type='text' placeholder='Name' required />

        <input id='email' type='email' placeholder='Enter email' required />

        <textarea id='message' placeholder='Your Message' rows='6' required />

        <button className='btn contact__form-submit' type='submit'>
          SUBMIT
        </button>
      </form>
    </section>
  )
}
