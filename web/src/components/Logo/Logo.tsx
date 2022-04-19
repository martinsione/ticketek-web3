import * as React from "react"
import { SVGProps, Ref, forwardRef } from "react"

function Logo(props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>) {
    return <svg
        ref={ref}
        fill="#fff"
        viewBox="0 0 415.2 307.4"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M0 50.8C0 22.9 22.3 0 50.2 0h314.9c27.8 0 50.2 22.9 50.2 50.8v61.8c0 5.3-4.3 9.6-9.6 9.6-17 0-31 14-31 31.6s14 31.6 31 31.6c5.3 0 9.6 4.3 9.6 9.6v61.8c0 27.9-22.3 50.8-50.2 50.8H50.2c-27.9-.2-50.2-23.1-50.2-51v-61.8c0-5.3 4.3-9.6 9.6-9.6 17 0 31-14 31-31.6s-14-31.6-31-31.6c-5.3 0-9.6-4.3-9.6-9.6V50.8zm50.2-31.6c-17 0-31 14-31 31.6v53.1c23.2 4.5 40.6 25.2 40.6 49.9S42.4 199 19.2 203.6v53.1c0 17.6 14 31.6 31 31.6h314.9c17 0 31-14 31-31.6v-53.1c-23.2-4.5-40.6-25.2-40.6-49.9s17.4-45.3 40.6-49.9v-53c0-17.6-14-31.6-31-31.6H50.2z" />
        <path d="M173.4 201.7h-23.7l-39.6-59.3v59.3H86.5v-96.1h23.7l39.6 59.5v-59.5h23.7v96.1zM253.9 105.7v18.7h-39.6v20.3h29.6v18.2h-29.6v38.9h-23.7v-96.1h63.3zM336.2 105.7v18.7h-25.8v77.3h-23.7v-77.3H261v-18.7h75.2z" />
    </svg>
}

const ForwardRef = forwardRef(Logo)
export default ForwardRef