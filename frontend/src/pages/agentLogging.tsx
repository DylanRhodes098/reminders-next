import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';

export default function Agent () { 

return (
  <div>
  <div className="flex flex-col gap-10 pt-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold">
       Agent
      </h1>
      <div className="flex flex-row gap-4">
      <Input placeholder="Enter your prompt" />
      <Button type="primary">
        Submit
      </Button>
      </div>
      </div>

      <div className="mt-10"> 
        <p className="whitespace-pre-wrap text-sm opacity-90"> </p>
      </div>
      </div>


); 

} 