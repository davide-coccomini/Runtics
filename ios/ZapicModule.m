
//
//  ZapicModule.m
//  ZapicReactNativeDemo
//
//  Created by Daniel Sarfati on 6/17/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ZapicModule.h"
#import <React/RCTLog.h>
#import <Zapic/Zapic.h>

@implementation ZapicModule

//Exports the Zapic module
RCT_EXPORT_MODULE(Zapic);

RCT_EXPORT_METHOD(showPage:(NSString *)page)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [Zapic showPage:page];
  });
}

RCT_EXPORT_METHOD(showDefaultPage)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [Zapic showDefaultPage];
  });
}

RCT_EXPORT_METHOD(submitEvent:(NSString *)event)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    //Deserialize the string into a dictionary
    NSDictionary* dict = [ZapicUtils deserialize: event];
    
    //Submit the event
    [Zapic submitEvent:dict];
  });
}

RCT_EXPORT_METHOD(handleInteraction:(NSString *)data)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    //Deserialize the string into a dictionary
    NSDictionary* dict = [ZapicUtils deserialize: data];
    
    [Zapic handleInteraction:dict];
  });
}

RCT_EXPORT_METHOD(getPlayer:(RCTResponseSenderBlock)callback)
{
  ZapicPlayer* player = Zapic.player;
  callback(@[player]);
}

@end
