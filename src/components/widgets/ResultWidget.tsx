import React, { useEffect } from 'react';

const ResultWidget = () => {
    useEffect(() => {
        // Create a script element
        const script = document.createElement('script');
        script.src = 'https://www.footballwidgets.com/js/widgets.js';
        script.async = true;
        script.onload = () => {
            // Optionally, you can perform any additional actions after the script has loaded
        };

        // Append the script to the document body
        document.body.appendChild(script);

        // Clean up the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="tlds_widget" data-widget="results" data-theme="default" data-comp="4"></div>
    );
};

export default ResultWidget;
